import { AsyncPipe, DatePipe } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    inject,
    type OnDestroy,
    type OnInit,
} from '@angular/core';
import {
    type AbstractControl,
    FormBuilder,
    type FormGroup,
    ReactiveFormsModule,
    type ValidationErrors,
    type ValidatorFn,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, filter, forkJoin, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { BtnListComponent } from "../../components/btn-list/btn-list.component";
import { HeaderComponent } from "../../components/header/header.component";
import { LogoPlatformComponent } from "../../components/logo-platform/logo-platform.component";
import { GameGroupsService } from '../../services/api/game-groups.service';
import { GamesService } from '../../services/api/games.service';
import { PlatformsService } from '../../services/api/platforms.service';
import { DialogService } from '../../services/dialog.service';
import { ExplorerService } from '../../services/explorer.service';
import type { IPlatform } from '../../types/platforms.interfaces';
import type { IGame, IGameGroup } from './../../types/games.interfaces';
import type { IGameForm, IGameFormValue } from './game.interface';

interface ISimilarGame {
    valueProgress: number;
    interval: ReturnType<typeof setInterval> | null;
    isShowProgress: boolean;
    isLoadData: boolean;
    findedGames: IGame[] | [];
    stepDelay: number,
    sizeStepProgress: number,
};

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: [ './game.component.scss' ],
    standalone: true,
    providers: [
        PlatformsService,
        DialogService,
        ExplorerService,
        GameGroupsService,
    ],
    imports: [
        MatIconModule,
        ReactiveFormsModule,
        DatePipe,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatTooltipModule,
        HeaderComponent,
        LogoPlatformComponent,
        MatProgressSpinnerModule,
        AsyncPipe,
        BtnListComponent,
        MatSlideToggleModule,
    ],
})
export class GameComponent implements OnInit, OnDestroy {
    public readonly dialogService = inject(DialogService);
    public readonly explorerService = inject(ExplorerService);
    private readonly _fb = inject(FormBuilder);
    private readonly _gamesService = inject(GamesService);
    private readonly _gameGroupsService = inject(GameGroupsService);
    private readonly _snackBar = inject(MatSnackBar);
    private readonly _route = inject(ActivatedRoute);
    private readonly _platformsService = inject(PlatformsService);
    private readonly _cdr = inject(ChangeDetectorRef);

    public isLoad$ = new BehaviorSubject<boolean>(false);
    private readonly _destroy$ = new Subject<void>();
    private readonly _searchTimerId: ReturnType<typeof setTimeout> | null;

    public gameForm: FormGroup<IGameForm>;
    public platformList: IPlatform[] = [];
    public editGame: IGame | undefined;
    public similarGame: ISimilarGame;
    public gameGroupsList: IGameGroup[];

    ngOnInit(): void {
        this.isLoad$.next(true);
        this._setSimilarGame({
            allDelay: 3000,
            stepDelay: 1000,
        });

        forkJoin([
            this._route.params.pipe(take(1)),
            this._gameGroupsService.getGameGroups(),
            this._platformsService.getPlatforms(),
        ])
        .pipe(takeUntil(this._destroy$))
        .subscribe(([ params, gameGroups, platforms ]) => {
            this.gameGroupsList = gameGroups;
            this.platformList = platforms;

            const id = params && params['id'];

            if (id) {
                this._initEditGame(params['id']);
            } else {
                this._initCreateGame();
            }
        });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
        this.isLoad$.complete();

        if (this._searchTimerId) {
            clearTimeout(this._searchTimerId);
        }
    }

    public resetField(): void {
        this._initForm();
    }

    public saveGame(): void {
        const formData = this.gameForm.getRawValue() as IGameFormValue;
        const newGame = this._mappingData(formData);

        this.isLoad$.next(true);

        this._openSnackBar(newGame.name);

        if (this.editGame) {
            this._updateGame(newGame);
        } else {
            this._createGame(newGame);
        }
    }

    public deleteGame(): void {
        const dialogRef = this.dialogService.openYesNoDialog({
            data: {
                textDialog: 'Удалить игру?',
                yesTextButton: 'УДАЛИТЬ',
                noTextButton: 'Отмена',
            },
        });

        dialogRef.afterClosed()
            .pipe(
                takeUntil(this._destroy$),
                filter(result => !!result && !!this.editGame?.id),
                tap(() => {
                    this.isLoad$.next(true);
                }),
                switchMap(() => this._gamesService.deleteGame(this.editGame?.id as string)),
                catchError(error => {
                    console.error(error);
                    this.dialogService.openErrorDialog(error);
                    this.isLoad$.next(false);

                    return EMPTY;
                }),
            )
            .subscribe(result => {
                this.isLoad$.next(false);

                if (result.status === 'success') {
                    this._openSnackBar(`${this.editGame?.name} удалено`);
                    this.explorerService.goToHome();
                }
            });
    }

    private _initEditGame(id: string): void {
        const game = this._gamesService.getGameById(id);

        this.editGame = game;

        this._initForm();
        this.isLoad$.next(false);
    }

    private _initCreateGame(): void {
        this._initForm();
        this.isLoad$.next(false);
    }

    private _initForm(): void {
        if (this.editGame) {
            const gameGroupsValue = ((): IGameGroup[] => {
                if (!this.editGame?.groups?.length) {
                    return [] as IGameGroup[];
                }

                const gameGroupsIds = this.gameGroupsList.map(grItem => grItem.id);

                return this.editGame?.groups
                    .filter(grId => gameGroupsIds.includes(grId))
                    .map(grId => {
                        return this.gameGroupsList.find(grrItem => grrItem.id === grId);
                    }) as IGameGroup[];
            })();

            this.gameForm = this._fb.group({
                id: [ this.editGame.id, Validators.required ],
                dateEdit: [ new Date(this.editGame.dateEdit).toISOString(), Validators.required ],
                name: [ this.editGame.name, Validators.required ],
                logo: [ this.editGame.logo, [ Validators.required, this._createPasswordStrengthValidator() ] ],
                platforms: [
                    this._platformsService.getPlatformsByTypes(this.platformList, this.editGame.platforms),
                    Validators.required
                ],
                gameGroups: [ gameGroupsValue ],
                completed: [ Boolean(this.editGame.completed) ],
            });
        } else {
            this.gameForm = this._fb.group({
                id: [ uuidv4(), Validators.required ],
                dateEdit: [ new Date().toISOString(), Validators.required ],
                name: [ '', Validators.required ],
                logo: [ '', [ Validators.required, this._createPasswordStrengthValidator() ] ],
                platforms: [ [] as IPlatform[], Validators.required ],
                gameGroups: [ [] as IGameGroup[] ],
                completed: [ false ],
            });
        }

        this._setValueChanges();
        this._cdr.detectChanges();
    }

    private _updateGame(game: IGame): void {
        this._gamesService.updateGame(game)
            .pipe(
                takeUntil(this._destroy$),
                catchError(error => {
                    console.error(error);
                    this.dialogService.openErrorDialog(error);
                    this.isLoad$.next(false);

                    return EMPTY;
                }),
            )
            .subscribe(() => {
                this.isLoad$.next(false);
                this.explorerService.goToHome();
            });

    }

    private _createGame(game: IGame): void {
        this._gamesService.createGame(game)
            .pipe(
                takeUntil(this._destroy$),
                catchError(error => {
                    console.error(error);
                    this.dialogService.openErrorDialog(error);
                    this.isLoad$.next(false);

                    return EMPTY;
                }),
            )
            .subscribe(() => {
                this.isLoad$.next(false);
                this.explorerService.goToHome();
            });
    }

    private _createPasswordStrengthValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value) {
                const value: string = control.value as string;
                const isVaid: boolean = value.includes('https://') || value.includes('http://');

                return !isVaid ? { url: true } : null;
            }

            return { url: true };
        }
    }

    private _mappingData(newGameData: IGameFormValue): IGame {
        return {
            id: newGameData.id,
            name: newGameData.name,
            logo: newGameData.logo,
            platforms: newGameData.platforms.map(item => item.type),
            dateEdit: new Date().toISOString(),
            groups: newGameData.gameGroups.map(item => item.id),
            completed: Boolean(newGameData.completed),
        };
    }

    private _openSnackBar(message: string): void {
        this._snackBar.open(message, 'OK', { duration: 5000 });
    }

    private _setValueChanges(): void {
        if (!this.editGame) {
            this.gameForm.get('name')?.valueChanges
                .pipe(takeUntil(this._destroy$))
                .subscribe(this._fieldNameChangeHandler.bind(this));
        }
    }

    private _fieldNameChangeHandler(name: string | null): void {
        const clear = (isShowProgress: boolean) => {
            this.similarGame.findedGames = [];
            this.similarGame.isShowProgress = isShowProgress;
            this.similarGame.valueProgress = 0;

            if (this.similarGame.interval) {
                clearInterval(this.similarGame.interval);
                this.similarGame.interval = null;
            }
        };

        if (!name || name.length < 3) {
            clear(false);

            return;
        } else {
            clear(true);
        }

        this.similarGame.interval = setInterval(() => {
            if (this.similarGame.interval && this.similarGame.valueProgress >= 100) {
                clearInterval(this.similarGame.interval);
                this.similarGame.isShowProgress = false;
                this.similarGame.isLoadData = true;
                this._cdr.detectChanges();

                const games = this._gamesService.searchGamesByName(name);

                if (games?.length) {
                    this.similarGame.findedGames = games.slice(0, 8);
                }

                this.similarGame.isLoadData = false;
                this._cdr.detectChanges();
            } else {
                this.similarGame.valueProgress += this.similarGame.sizeStepProgress;
                this._cdr.detectChanges();
            }
        }, this.similarGame.stepDelay);
    }

    private _setSimilarGame(settings: { allDelay: number, stepDelay: number }): void {
        const allDelay = settings.allDelay;
        const stepDelay = settings.stepDelay;
        const allSteps = allDelay / stepDelay
        const sizeStepProgress = Math.ceil(100 / allSteps);

        this.similarGame = {
            valueProgress: 0,
            interval: null,
            isShowProgress: false,
            isLoadData: false,
            findedGames: [],
            stepDelay,
            sizeStepProgress,
        }
    }
}
