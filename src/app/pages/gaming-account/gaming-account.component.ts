import { AsyncPipe, DatePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    type OnDestroy,
    type OnInit,
} from '@angular/core';
import { FormBuilder, type FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatActionList, MatListItem } from "@angular/material/list";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatOption, MatSelectModule, MatSelectTrigger } from "@angular/material/select";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import cloneDeep from 'lodash-es/cloneDeep';
import {
    BehaviorSubject,
    catchError,
    EMPTY,
    filter,
    forkJoin,
    type Observable,
    of,
    Subject,
    switchMap,
    take,
    takeUntil,
    tap,
} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { HeaderComponent } from "../../components/header/header.component";
import { LogoPlatformComponent } from "../../components/logo-platform/logo-platform.component";
import { GamesService } from '../../services/api/games.service';
import { GamingAccountsService } from '../../services/api/gaming-accounts.service';
import { PlatformsService } from '../../services/api/platforms.service';
import { DialogService } from '../../services/dialog.service';
import { ExplorerService } from '../../services/explorer.service';
import type { IGame } from '../../types/games.interfaces';
import type { IGamingAccount } from '../../types/gaming-accounts.interfaces';
import type { IPlatform } from '../../types/platforms.interfaces';
import type { IGamingAccountForm, IGamingAccountFormValue } from './gaming-account.interface';

@Component({
    selector: 'app-gaming-account',
    templateUrl: './gaming-account.component.html',
    styleUrls: [ './gaming-account.component.scss' ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DialogService,
        ExplorerService,
        GamingAccountsService,
        PlatformsService,
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
        MatSelectTrigger,
        LogoPlatformComponent,
        MatOption,
        FormsModule,
        MatSelectModule,
    ],
})
export class GamingAccountComponent implements OnInit, OnDestroy {
    public readonly explorerService = inject(ExplorerService);
    private readonly _gamingAccountsService = inject(GamingAccountsService);
    private readonly _dialogService = inject(DialogService);
    private readonly _cdr = inject(ChangeDetectorRef);
    private readonly _route = inject(ActivatedRoute);
    private readonly _fb = inject(FormBuilder);
    private readonly _snackBar = inject(MatSnackBar);
    private readonly _gamesService = inject(GamesService);
    private readonly _platformsService = inject(PlatformsService);

    public readonly isLoad$ = new BehaviorSubject<boolean>(false);

    public gamesList: IGame[] = [];
    public form: FormGroup<IGamingAccountForm>;
    public editGamingAccount: IGamingAccount | undefined;
    public foundGamesList: IGame[] = [];
    public platformList: IPlatform[] = [];

    private _searchTimerId: ReturnType<typeof setTimeout> | null;

    private readonly _destroy$ = new Subject<void>();

    ngOnInit(): void {
        this.isLoad$.next(true);

        forkJoin([
            this._route.params.pipe(take(1)),
            this._platformsService.getPlatforms(),
        ])
            .pipe(takeUntil(this._destroy$))
            .subscribe(([ params, platforms ]) => {
                this.platformList = platforms;

                const id = params && params['id'];

                if (id) {
                    this._initEdit(params['id']);
                } else {
                    this._initCreate();
                }
            });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
        this.isLoad$.complete();
    }

    private _initCreate(): void {
        this._initForm();
        this.isLoad$.next(false);
    }

    public resetField(): void {
        this._initForm();
    }

    public deleteGamingAccount(): void {
        const dialogRef = this._dialogService.openYesNoDialog({
            data: {
                textDialog: 'Удалить игровой аккаунт?',
                yesTextButton: 'УДАЛИТЬ',
                noTextButton: 'Отмена',
            },
        });

        dialogRef.afterClosed()
            .pipe(
                takeUntil(this._destroy$),
                filter(result => !!result && !!this.editGamingAccount?.id),
                tap(() => {
                    this.isLoad$.next(true);
                }),
                switchMap(() => this._gamingAccountsService.deleteGamingAccount(this.editGamingAccount?.id as string)),
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
                    this._openSnackBar(`${this.editGamingAccount?.name} удалено`);
                    this.explorerService.goToGamingAccountsList();
                }
            });
    }

    public saveGamingAccount(): void {
        const formData = this.form.getRawValue() as IGamingAccountFormValue;
        const mapAccountData = this._mappingGamingAccountData(formData);
        const mapGames = this._mappingGames(this.gamesList, formData);

        this._sendData(mapAccountData, mapGames);
    }

    private _sendData(accountData: IGamingAccount, gamesList: IGame[]): void {
        this.isLoad$.next(true);

        const gameAccountObservable: Observable<IGamingAccount> = (() => {
            const isChange = this._checkGamingAccount(this.editGamingAccount, accountData);

            if (!isChange) {
                return of(accountData);
            }

            if (this.editGamingAccount) {
                return this._updateGamingAccount(accountData);
            } else {
                return this._createGamingAccount(accountData);
            }
        })();

        gameAccountObservable
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
                this.explorerService.goToGamingAccountsList();
            });
    }

    public searchGameByName(): void {
        if (this._searchTimerId) {
            clearTimeout(this._searchTimerId);
            this._searchTimerId = null;
        }

        this._searchTimerId = setTimeout(() => {
            const text = this.form.value.searchGame;
            const formGames = this.form.value.games?.map(gameItem => gameItem.id) || [];

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
        const gamesControl = this.form.get('games');
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
        const gamesControl = this.form.get('games');
        const formGamesList = gamesControl?.value;

        if (formGamesList) {
            const gameIdx = formGamesList.findIndex(gameItem => (gameItem.id === game.id));

            if (gameIdx !== -1) {
                formGamesList.splice(gameIdx, 1);
            }
        }

        this._cdr.detectChanges();
    }

    private _initEdit(id: string): void {
        this.editGamingAccount = this._gamingAccountsService.getGamingAccountById(id);
        this.gamesList = this._gamesService.searchGamesByAccount(id);

        this._initForm();
        this.isLoad$.next(false);
    }

    private _initForm(): void {
        const gamesList = cloneDeep(this.gamesList);
        const platform = () => {
            if (this.editGamingAccount?.platform) {
                return this._platformsService.getPlatformByType(this.editGamingAccount.platform) || null;
            }

            return null;
        }

        if (this.editGamingAccount) {
            this.form = this._fb.group({
                id: [ this.editGamingAccount.id, Validators.required ],
                name: [ this.editGamingAccount.name, Validators.required ],
                dateEdit: [ new Date(this.editGamingAccount.dateEdit).toISOString(), Validators.required ],
                searchGame: [ '' ],
                games: [ gamesList ],
                platform: [ platform(), Validators.required ],
            });
        } else {
            this.form = this._fb.group({
                id: [ uuidv4(), Validators.required ],
                name: [ '', Validators.required ],
                dateEdit: [ new Date().toISOString(), Validators.required ],
                platform: [ platform(), Validators.required ],
                searchGame: [ '' ],
                games: [ gamesList ],
            });
        }

        this.form.get('searchGame')?.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => this.searchGameByName());

        this._cdr.detectChanges();
    }

    private _openSnackBar(message: string): void {
        this._snackBar.open(message, 'OK', { duration: 5000 });
    }

    private _updateGamingAccount(account: IGamingAccount): Observable<IGamingAccount> {
        return this._gamingAccountsService.updateGamingAccount(account)
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

    private _createGamingAccount(account: IGamingAccount): Observable<IGamingAccount> {
        return this._gamingAccountsService.createGamingAccount(account)
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

    private _mappingGamingAccountData(newAccountData: IGamingAccountFormValue): IGamingAccount {
        return {
            id: newAccountData.id,
            name: newAccountData.name,
            dateEdit: newAccountData.dateEdit,
            platform: newAccountData.platform.type,
        };
    }

    private _mappingGames(gamesList: IGame[], newAccountData: IGamingAccountFormValue): IGame[] {
        const games = this._getChangeGames(gamesList, newAccountData);

        games.deleted.forEach(gameItem => {
            if (gameItem.accounts) {
                const accountIdx = gameItem.accounts.findIndex(accountId => accountId === newAccountData.id);

                if (accountIdx !== -1) {
                    gameItem.accounts.splice(accountIdx, 1);
                }
            }
        });

        games.new.forEach(gameItem => {
            if (!gameItem.accounts) {
                gameItem.accounts = [];
            }

            gameItem.accounts.push(newAccountData.id);
        });

        return [ ...games.deleted, ...games.new ];
    }

    private _getChangeGames(gamesList: IGame[], newAccountData: IGamingAccountFormValue): { new: IGame[], deleted: IGame[] } {
        if (this.editGamingAccount) {
            const currentGamesIds = gamesList.map(gameItem => gameItem.id);
            const formGamesIds = newAccountData.games?.map(gameItem => gameItem.id) || [];

            const deletedGamesIds = currentGamesIds.filter(id => !formGamesIds.includes(id));
            const newGamesIds = formGamesIds.filter(id => !currentGamesIds.includes(id));

            const deletedGames = cloneDeep(gamesList).filter(gameItem => deletedGamesIds.includes(gameItem.id));
            const newGames = newAccountData.games?.filter(gameItem => newGamesIds.includes(gameItem.id));

            return {
                new: newGames || [],
                deleted: deletedGames
            };
        } else {
            return {
                new: newAccountData.games || [],
                deleted: [],
            };
        }
    }

    private _checkGamingAccount(editData: IGamingAccount | undefined, newData: IGamingAccount): boolean {
        if (!editData) {
            return true;
        }

        if (editData.name !== newData.name) {
            return true;
        }

        if (editData.platform !== newData.platform) {
            return true;
        }

        return false;
    }
}
