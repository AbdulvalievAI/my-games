import { ScrollingModule } from '@angular/cdk/scrolling';
import { AsyncPipe } from '@angular/common';
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
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import {
    BehaviorSubject,
    catchError,
    EMPTY,
    filter,
    Subject,
    switchMap,
    takeUntil,
    tap,
} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { BtnListComponent } from "../../components/btn-list/btn-list.component";
import type { IBtnConfig } from '../../components/btn-list/btn-list.interface';
import { HeaderComponent } from "../../components/header/header.component";
import { GameGroupsService } from '../../services/api/game-groups.service';
import { GamesService } from '../../services/api/games.service';
import { DialogService } from '../../services/dialog.service';
import { ExplorerService } from '../../services/explorer.service';
import type { IGame, IGameGroup } from '../../types/games.interfaces';
import type { INewGameGroup } from './game-group.interface';

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
        GamesService,
    ],
    imports: [
        MatListModule,
        ScrollingModule,
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
        BtnListComponent
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
    public readonly isLoadGame$ = new BehaviorSubject<boolean>(false);
    public gameGroupsList: IGameGroup[] = [];
    public gamesList: IGame[] = [];
    public newGameGroupForm: FormGroup<INewGameGroup>;
    public editGameGroup: IGameGroup | undefined;
    public readonly btnConfig: IBtnConfig = {
        title: 'Удалить из группы',
        color: 'warn',
        icon: 'delete',
    };

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
        this.isLoadGame$.complete();
    }

    private _initCreateGame(): void {
        this._initForm();
        this.isLoad$.next(false);
    }

    public resetField(): void {
        this._initForm();
    }

    public deleteGame(): void {
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

    public saveGame(): void {
        const formData = this.newGameGroupForm.getRawValue() as IGameGroup;

        this.isLoad$.next(true);

        this._openSnackBar(formData.name);

        if (this.editGameGroup) {
            this._updateGame(formData);
        } else {
            this._createGame(formData);
        }
    }

    public deleteGroupFromGame(game: IGame): void {
        const gameGroupId = this.editGameGroup?.id;

        if (gameGroupId) {
            this.isLoadGame$.next(true);

            this._gamesService.deleteGroupFromGame(game.id, gameGroupId)
                .pipe(
                    takeUntil(this._destroy$),
                    catchError(error => {
                        console.error(error);
                        this._dialogService.openErrorDialog(error);
                        this.isLoadGame$.next(false);

                        return EMPTY;
                    }),
                )
                .subscribe(() => {
                    this.gamesList = this._gamesService.searchGamesByGroup(gameGroupId);

                    this.isLoadGame$.next(false);
                });
        }
    }

    private _initEditGameGroup(id: string): void {
        this.editGameGroup = this._gameGroupsService.getGameGroupById(id);
        this.gamesList = this._gamesService.searchGamesByGroup(id);

        this._initForm();
        this.isLoad$.next(false);
    }

    private _initForm(): void {
        if (this.editGameGroup) {
            this.newGameGroupForm = this._fb.group({
                id: [ this.editGameGroup.id, Validators.required ],
                name: [ this.editGameGroup.name, Validators.required ],

            });
        } else {
            this.newGameGroupForm = this._fb.group({
                id: [ uuidv4(), Validators.required ],
                name: [ '', Validators.required ],
            });
        }

        this._cdr.detectChanges();
    }

    private _openSnackBar(message: string): void {
        this._snackBar.open(message, 'OK', { duration: 5000 });
    }

    private _updateGame(group: IGameGroup): void {
        this._gameGroupsService.updateGameGroup(group)
            .pipe(
                takeUntil(this._destroy$),
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

    private _createGame(group: IGameGroup): void {
        this._gameGroupsService.createGameGroup(group)
            .pipe(
                takeUntil(this._destroy$),
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
}
