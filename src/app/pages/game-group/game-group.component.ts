import { AsyncPipe, DatePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    type OnDestroy,
    type OnInit,
} from '@angular/core';
import { FormBuilder, type FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatActionList, MatListItem } from "@angular/material/list";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import cloneDeep from 'lodash-es/cloneDeep';
import {
    BehaviorSubject,
    catchError,
    EMPTY,
    filter,
    type Observable,
    of,
    Subject,
    switchMap,
    takeUntil,
    tap,
} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { HeaderComponent } from "../../components/header/header.component";
import { GameGroupsService } from '../../services/api/game-groups.service';
import { GamesService } from '../../services/api/games.service';
import { DialogService } from '../../services/dialog.service';
import { ExplorerService } from '../../services/explorer.service';
import type { IGame, IGameGroup } from '../../types/games.interfaces';
import type { IGameGroupForm, IGameGroupFormValue } from './game-group.interface';

@Component({
    selector: 'app-game-group',
    templateUrl: './game-group.component.html',
    styleUrls: [ './game-group.component.scss' ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DialogService,
        ExplorerService,
        GameGroupsService,
    ],
    imports: [
        MatProgressSpinnerModule,
        MatIconModule,
        HeaderComponent,
        MatButtonModule,
        MatTooltipModule,
        AsyncPipe,
        MatFormField,
        MatLabel,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        DatePipe,
        MatActionList,
        MatListItem,
    ],
})
export class GameGroupComponent implements OnInit, OnDestroy {
    public readonly explorerService = inject(ExplorerService);
    private readonly _gameGroupsService = inject(GameGroupsService);
    private readonly _dialogService = inject(DialogService);
    private readonly _cdr = inject(ChangeDetectorRef);
    private readonly _route = inject(ActivatedRoute);
    private readonly _fb = inject(FormBuilder);
    private readonly _snackBar = inject(MatSnackBar);
    private readonly _gamesService = inject(GamesService);

    public readonly isLoad$ = new BehaviorSubject<boolean>(false);

    public gameGroupsList: IGameGroup[] = [];
    public gamesList: IGame[] = [];
    public gameGroupForm: FormGroup<IGameGroupForm>;
    public editGameGroup: IGameGroup | undefined;
    public foundGamesList: IGame[] = [];

    private _searchTimerId: ReturnType<typeof setTimeout> | null;

    private readonly _destroy$ = new Subject<void>();

    ngOnInit(): void {
        this.isLoad$.next(true);

        this._route.params
            .pipe(takeUntil(this._destroy$))
            .subscribe(params => {
                const id = params && params['id'];

                if (id) {
                    this._initEditGameGroup(params['id']);
                } else {
                    this._initCreateGame();
                }
            });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
        this.isLoad$.complete();
    }

    private _initCreateGame(): void {
        this._initForm();
        this.isLoad$.next(false);
    }

    public resetField(): void {
        this._initForm();
    }

    public deleteGameGroup(): void {
        const dialogRef = this._dialogService.openYesNoDialog({
            data: {
                textDialog: 'Удалить группу игр?',
                yesTextButton: 'УДАЛИТЬ',
                noTextButton: 'Отмена',
            },
        });

        dialogRef.afterClosed()
            .pipe(
                takeUntil(this._destroy$),
                filter(result => !!result && !!this.editGameGroup?.id),
                tap(() => {
                    this.isLoad$.next(true);
                }),
                switchMap(() => this._gameGroupsService.deleteGameGroup(this.editGameGroup?.id as string)),
                catchError(error => {
                    console.error(error);
                    this._dialogService.openErrorDialog(error);
                    this.isLoad$.next(false);

                    return EMPTY;
                }),
            )
            .subscribe(result => {
                this.isLoad$.next(false);

                if (result.status === 'success') {
                    this._openSnackBar(`${this.editGameGroup?.name} удалено`);
                    this.explorerService.goToGameGroupsList();
                }
            });
    }

    public saveGameGroup(): void {
        const formData = this.gameGroupForm.getRawValue() as IGameGroupFormValue;
        const mapGroupData = this._mappingGroupData(formData);
        const mapGames = this._mappingGames(this.gamesList, formData);

        this._sendData(mapGroupData, mapGames);
    }

    private _sendData(groupData: IGameGroup, gamesList: IGame[]): void {
        this.isLoad$.next(true);

        const gameGroupObservable: Observable<IGameGroup> = (() => {
            const isChange = this._checkChangeGroup(this.editGameGroup, groupData);

            if (!isChange) {
                return of(groupData);
            }

            if (this.editGameGroup) {
                return this._updateGameGroup(groupData);
            } else {
                return this._createGameGroup(groupData);
            }
        })();

        gameGroupObservable
            .pipe(
                takeUntil(this._destroy$),
                switchMap(() => {
                    if (gamesList.length) {
                        return this._gamesService.updateGames(gamesList);

                    } else {
                        return of(true);
                    }
                }),
                catchError(error => {
                    console.error(error);
                    this._dialogService.openErrorDialog(error);
                    this.isLoad$.next(false);

                    return EMPTY;
                }),
            )
            .subscribe(() => {
                this.isLoad$.next(false);
                this.explorerService.goToGameGroupsList();
            });
    }

    public searchGameByName(): void {
        if (this._searchTimerId) {
            clearTimeout(this._searchTimerId);
            this._searchTimerId = null;
        }

        this._searchTimerId = setTimeout(() => {
            const text = this.gameGroupForm.value.searchGame;
            const formGames = this.gameGroupForm.value.games?.map(gameItem => gameItem.id) || [];

            if (text) {
                this.foundGamesList = this._gamesService.searchGamesByName(text)
                    .filter(gameItem => !formGames.includes(gameItem.id))
                    .slice(0, 10);
            } else {
                this.foundGamesList = [];
            }

            this._cdr.detectChanges();
        }, 500);
    }

    public selectGame(game: IGame): void {
        const gamesControl = this.gameGroupForm.get('games');
        const formGamesList = gamesControl?.value;

        if (formGamesList) {
            const checkGamesList = formGamesList.find(gameItem => gameItem.id === game.id);

            if (!checkGamesList) {
                formGamesList.push(game);
            }
        } else {
            gamesControl?.setValue([ game ]);
        }

        this._cdr.detectChanges();
    }

    public deleteGame(game: IGame): void {
        const gamesControl = this.gameGroupForm.get('games');
        const formGamesList = gamesControl?.value;

        if (formGamesList) {
            const gameIdx = formGamesList.findIndex(gameItem => (gameItem.id === game.id));

            if (gameIdx !== -1) {
                formGamesList.splice(gameIdx, 1);
            }
        }

        this._cdr.detectChanges();
    }

    private _initEditGameGroup(id: string): void {
        this.editGameGroup = this._gameGroupsService.getGameGroupById(id);
        this.gamesList = this._gamesService.searchGamesByGroup(id);

        this._initForm();
        this.isLoad$.next(false);
    }

    private _initForm(): void {
        const gamesList = cloneDeep(this.gamesList);

        if (this.editGameGroup) {
            this.gameGroupForm = this._fb.group({
                id: [ this.editGameGroup.id, Validators.required ],
                name: [ this.editGameGroup.name, Validators.required ],
                dateEdit: [ new Date(this.editGameGroup.dateEdit).toISOString(), Validators.required ],
                searchGame: [ '' ],
                games: [ gamesList ],

            });
        } else {
            this.gameGroupForm = this._fb.group({
                id: [ uuidv4(), Validators.required ],
                name: [ '', Validators.required ],
                dateEdit: [ new Date().toISOString(), Validators.required ],
                searchGame: [ '' ],
                games: [ gamesList ],
            });
        }

        this.gameGroupForm.get('searchGame')?.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => this.searchGameByName());

        this._cdr.detectChanges();
    }

    private _openSnackBar(message: string): void {
        this._snackBar.open(message, 'OK', { duration: 5000 });
    }

    private _updateGameGroup(group: IGameGroup): Observable<IGameGroup> {
        return this._gameGroupsService.updateGameGroup(group)
            .pipe(
                takeUntil(this._destroy$),
                catchError(error => {
                    console.error(error);
                    this._dialogService.openErrorDialog(error);
                    this.isLoad$.next(false);

                    return EMPTY;
                }),
            );
    }

    private _createGameGroup(group: IGameGroup): Observable<IGameGroup> {
        return this._gameGroupsService.createGameGroup(group)
            .pipe(
                takeUntil(this._destroy$),
                catchError(error => {
                    console.error(error);
                    this._dialogService.openErrorDialog(error);
                    this.isLoad$.next(false);

                    return EMPTY;
                }),
            );

    }

    private _mappingGroupData(newGameGroupData: IGameGroupFormValue): IGameGroup {
        return {
            id: newGameGroupData.id,
            name: newGameGroupData.name,
            dateEdit: newGameGroupData.dateEdit,
        };
    }

    private _mappingGames(gamesList: IGame[], newGameGroupData: IGameGroupFormValue): IGame[] {
        const games = this._getChangeGames(gamesList, newGameGroupData);

        games.deleted.forEach(gameItem => {
            if (gameItem.groups) {
                const groupIdx = gameItem.groups.findIndex(groupId => groupId === newGameGroupData.id);

                if (groupIdx !== -1) {
                    gameItem.groups.splice(groupIdx, 1);
                }
            }
        });

        games.new.forEach(gameItem => {
            if (!gameItem.groups) {
                gameItem.groups = [];
            }

            gameItem.groups.push(newGameGroupData.id);
        });

        return [ ...games.deleted, ...games.new ];
    }

    private _getChangeGames(gamesList: IGame[], newGameGroupData: IGameGroupFormValue): { new: IGame[], deleted: IGame[] } {
        if (this.editGameGroup) {
            const currentGamesIds = gamesList.map(gameItem => gameItem.id);
            const formGamesIds = newGameGroupData.games?.map(gameItem => gameItem.id) || [];

            const deletedGamesIds = currentGamesIds.filter(id => !formGamesIds.includes(id));
            const newGamesIds = formGamesIds.filter(id => !currentGamesIds.includes(id));

            const deletedGames = cloneDeep(gamesList).filter(gameItem => deletedGamesIds.includes(gameItem.id));
            const newGames = newGameGroupData.games?.filter(gameItem => newGamesIds.includes(gameItem.id));

            return {
                new: newGames || [],
                deleted: deletedGames
            };
        } else {
            return {
                new: newGameGroupData.games || [],
                deleted: [],
            };
        }
    }

    private _checkChangeGroup(editData: IGameGroup | undefined, newData: IGameGroupFormValue): boolean {
        if (!editData) {
            return true;
        }

        if (editData.name !== newData.name) {
            return true
        }

        return false;
    }
}
