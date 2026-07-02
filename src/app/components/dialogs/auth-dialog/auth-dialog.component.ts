
import { AsyncPipe } from '@angular/common';
import { Component, inject, type OnDestroy, type OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, type FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from "@angular/material/divider";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
    BehaviorSubject,
    catchError,
    EMPTY,
    forkJoin,
    map,
    type Observable,
    of,
    Subject,
    switchMap,
    takeUntil,
} from 'rxjs';

import { EYdxFileNames, yandexDiskConfig } from '../../../config/yandex.config';
import { AuthService } from '../../../services/api/auth.service';
import { DataLocalService } from '../../../services/api/data/data-local.service';
import { YdxDiskService } from '../../../services/api/yandex-disk.service';
import { FileService } from '../../../services/file.service';
import type { IGame, IGameGroup } from '../../../types/games.interfaces';
import { LoadBlockComponent } from "../../load-block/load-block.component";
import type { IAuthForm, TAuthClosingAactivity } from './auth-dialog.interface';

interface ILoadStatus {
    isLoad: boolean;
    status: string;
}

interface IInfoItem {
    title: string;
    text: string;
}

@Component({
    selector: 'app-auth-dialog',
    templateUrl: './auth-dialog.component.html',
    styleUrls: [ './auth-dialog.component.scss' ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIcon,
        FormsModule,
        MatCardHeader,
        MatCard,
        MatCardContent,
        MatCardTitle,
        MatCardActions,
        MatDialogModule,
        MatTooltipModule,
        ReactiveFormsModule,
        AsyncPipe,
        LoadBlockComponent,
        MatDivider,
    ],
})
export class AuthDialogComponent implements OnInit, OnDestroy {
    public readonly dialogRef: MatDialogRef<AuthDialogComponent, TAuthClosingAactivity> = inject(MatDialogRef<AuthDialogComponent, TAuthClosingAactivity>);
    public readonly authService = inject(AuthService);
    private readonly _fb = inject(FormBuilder);
    private readonly _ydxDiskService = inject(YdxDiskService);
    private readonly _snackBar = inject(MatSnackBar);
    private readonly _diskService = inject(YdxDiskService);
    private readonly _dataLocalService = inject(DataLocalService);
    private readonly _fileService = inject(FileService);

    public form: FormGroup<IAuthForm>;
    public disabledForm = true;
    public infoList: IInfoItem[] = [];

    private _currentToken: string;

    public isLoad$ = new BehaviorSubject<ILoadStatus>({ isLoad: false, status: '' });
    private readonly _destroy$ = new Subject<void>();

    public ngOnInit(): void {
        this._initInfoList();
        this._initForm();
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
        this.isLoad$.complete();
    }

    private _initForm(): void {
        this.disabledForm = this.authService.isAuthorized()

        const token = this.authService.getToken();
        const clientId = this.authService.getCliendId();

        this.form = this._fb.group({
            token: this._createTokenControl(token, this.disabledForm),
            clientId: this._createCliendIdControl(clientId, this.disabledForm),
        }) as FormGroup<IAuthForm>;
    }

    public login() {
        if (this.form.valid) {
            const { clientId, token } = this.form.getRawValue();

            if (clientId && token) {
                this._currentToken = token;

                this._auth(this._currentToken)
                    .pipe(
                        takeUntil(this._destroy$),
                        switchMap(() => this._checkExistsFolder(this._currentToken)),
                        switchMap((isExistFolder) => {
                            if (isExistFolder) {
                                return of(true);
                            }

                            return this._createFolder(token);
                        }),
                        switchMap(() => this._syncData()),
                    )
                    .subscribe(() => {
                        this.isLoad$.next({ isLoad: false, status: 'Успешно!' });

                        if (clientId) {
                            this.authService.saveCliendId(clientId);
                        }

                        if (token) {
                            this.authService.saveToken(token);
                        }

                        this._openSnackBar('✅ Успешная авторизация! ✅');
                        this.dialogRef.close('syncData');
                    });
            }
        }
    }

    public logout() {
        this.authService.logout();
        this.dialogRef.close('syncData');
    }

    public openWindowToken() {
        const clientId = this.form.value.clientId;

        if (clientId) {
            this.authService.openWindowToken(clientId);
        }
    }

    private _openSnackBar(message: string, action = 'Закрыть'): void {
        this._snackBar.open(message, action, {
            duration: 5000
        });
    }

    private _createTokenControl(token: string | null, disabled = false) {
        return this._fb.control({ value: token, disabled }, Validators.required);
    }

    private _createCliendIdControl(clientId: string | null, disabled = false) {
        return this._fb.control({ value: clientId, disabled }, [ Validators.required ]);
    }

    private _auth(token: string): Observable<boolean> {
        this.isLoad$.next({ isLoad: true, status: 'Авторизация...' });

        return this._ydxDiskService.checkAccess(token)
            .pipe(
                catchError(error => {
                    console.error(error);
                    this._openSnackBar('⛔ Ошибка авторизации! ⛔');
                    this.isLoad$.next({ isLoad: false, status: 'Ошибка.' });

                    return EMPTY;
                }),
            )
    }

    private _checkExistsFolder(token: string): Observable<boolean> {
        this.isLoad$.next({ isLoad: true, status: 'Проверка диска...' });

        return this._diskService.checkExistsFolder(token);
    }

    private _createFolder(token: string): Observable<boolean> {
        this.isLoad$.next({ isLoad: true, status: 'Создание папки...' });

        return this._ydxDiskService.createFolder(token)
            .pipe(
                catchError(error => {
                    console.error(error);
                    this._openSnackBar('⛔ Ошибка создания папки! ⛔');
                    this.isLoad$.next({ isLoad: false, status: 'Ошибка.' });

                    return EMPTY;
                }),
            )
    }

    private _syncData(): Observable<boolean> {
        this.isLoad$.next({ isLoad: true, status: 'Синхронизация данных...' });

        return forkJoin([
            this._dataLocalService.getGames(),
            this._dataLocalService.getGameGroups(),
        ])
        .pipe(
            takeUntil(this._destroy$),
            switchMap(([ gamesLocal, gameGroupsLocal ]) => {
                return forkJoin([
                    this._syncGames(gamesLocal),
                    this._syncGameGroups(gameGroupsLocal),
                ]);
            }),
            map(() => true),
            catchError(error => {
                console.error(error);
                this._openSnackBar('⛔ Ошибка сихронизации! ⛔');
                this.isLoad$.next({ isLoad: false, status: 'Ошибка.' });

                return EMPTY;
            }),
        );
    }

    private _syncGames(gamesLocal: IGame[]): Observable<boolean> {
        if (gamesLocal.length) {
            return this._diskService.downloadFile<IGame>(EYdxFileNames.GAMES, this._currentToken)
                .pipe(
                    takeUntil(this._destroy$),
                    switchMap(gamesCloud => {
                        if (gamesCloud.status) {
                            const gamesMap = new Map<string, IGame>(
                                gamesCloud.jsonData.map(gameItem => [ gameItem.id, gameItem ]),
                            );

                            gamesLocal.forEach(gameLocalItem => {
                                const gameCloudItem = gamesMap.get(gameLocalItem.id);

                                if (!gameCloudItem) {
                                    gamesMap.set(gameLocalItem.id, gameLocalItem);
                                } else {
                                    const localDate = new Date(gameLocalItem.dateEdit);
                                    const cloudDate = new Date(gameCloudItem.dateEdit);

                                    if (localDate > cloudDate) {
                                        gamesMap.set(gameLocalItem.id, gameLocalItem);
                                    }
                                }
                            });

                            const file = this._fileService.generateFile([ ...gamesMap.values() ]);

                            return this._diskService.uploadFile(file, EYdxFileNames.GAMES, this._currentToken);
                        } else {
                            const file = this._fileService.generateFile(gamesLocal);

                            return this._diskService.uploadFile(file, EYdxFileNames.GAMES, this._currentToken);
                        }
                    }),
                    map(() => {
                        this._dataLocalService.cleanGames();

                        return true;
                    }),
                );
        } else {
            return of(true);
        }
    }

    private _syncGameGroups(gameGroupsLocal: IGameGroup[]): Observable<boolean> {
        if (gameGroupsLocal.length) {
            return this._diskService.downloadFile<IGameGroup>(EYdxFileNames.GAMES_GROUPS, this._currentToken)
                .pipe(
                    takeUntil(this._destroy$),
                    switchMap(gameGroupCloud => {
                        if (gameGroupCloud.status) {
                            const gameGroupMap = new Map<string, IGameGroup>(
                                gameGroupCloud.jsonData.map(gameGroupItem => [ gameGroupItem.id, gameGroupItem ]),
                            );

                            gameGroupsLocal.forEach(gameGroupLocalItem => {
                                const gameGroupCloudItem = gameGroupMap.get(gameGroupLocalItem.id);

                                if (!gameGroupCloudItem) {
                                    gameGroupMap.set(gameGroupLocalItem.id, gameGroupLocalItem);
                                } else {
                                    const localDate = new Date(gameGroupLocalItem.dateEdit);
                                    const cloudDate = new Date(gameGroupCloudItem.dateEdit);

                                    if (localDate > cloudDate) {
                                        gameGroupMap.set(gameGroupLocalItem.id, gameGroupLocalItem);
                                    }
                                }
                            });

                            const file = this._fileService.generateFile([ ...gameGroupMap.values() ]);

                            return this._diskService.uploadFile(file, EYdxFileNames.GAMES_GROUPS, this._currentToken);
                        } else {
                            const file = this._fileService.generateFile(gameGroupsLocal);

                            return this._diskService.uploadFile(file, EYdxFileNames.GAMES_GROUPS, this._currentToken);
                        }
                    }),
                    map(() => {
                        this._dataLocalService.cleanGameGroups();

                        return true;
                    }),
                );
        } else {
            return of(true);
        }
    }

    private _initInfoList(): void {
        this.infoList = [
            {
                title: 'Папка хранения данных:',
                text: yandexDiskConfig.folderPath,
            },
            {
                title: 'Название файла с играми:',
                text: EYdxFileNames.GAMES,
            },
            {
                title: 'Название файла с группами игр:',
                text: EYdxFileNames.GAMES_GROUPS,
            },
        ];
    }
}

