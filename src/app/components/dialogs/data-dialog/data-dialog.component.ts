import { Component, type ElementRef, inject, type OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';

import { EYdxFileNames } from '../../../config/yandex.config';
import { AuthService } from '../../../services/api/auth.service';
import { DataLocalService } from '../../../services/api/data/data-local.service';
import { GameGroupsService } from '../../../services/api/game-groups.service';
import { GamesService } from '../../../services/api/games.service';
import { GamingAccountsService } from '../../../services/api/gaming-accounts.service';
import { PlatformsService } from '../../../services/api/platforms.service';
import { type FileGenerationOptions, FileService } from '../../../services/file.service';
import type { IGame, IGameGroup } from '../../../types/games.interfaces';
import type { IGamingAccount } from '../../../types/gaming-accounts.interfaces';
import { BtnListComponent } from '../../btn-list/btn-list.component';
import type { IBtnConfig } from '../../btn-list/btn-list.interface';

interface IDataList {
    id: string;
    name: string;
}

@Component({
    selector: 'app-data-dialog',
    templateUrl: './data-dialog.component.html',
    styleUrls: [ './data-dialog.component.scss' ],
    standalone: true,
    providers: [
        PlatformsService,
        GameGroupsService,
        GamingAccountsService,
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        MatCardHeader,
        MatCard,
        MatCardContent,
        MatCardTitle,
        MatDialogModule,
        BtnListComponent,
        MatCardActions,
        MatIcon,
        MatButtonModule,
    ],
})
export class DataDialogComponent implements OnDestroy {
    public readonly dialogRef = inject(MatDialogRef<DataDialogComponent>);
    public readonly authService = inject(AuthService);
    private readonly _gameGroupsService = inject(GameGroupsService);
    private readonly _gamesService = inject(GamesService);
    private readonly _platformsService = inject(PlatformsService);
    private readonly _gamingAccountsService = inject(GamingAccountsService);
    private readonly _fileService = inject(FileService);
    private readonly _snackBar = inject(MatSnackBar);
    private readonly _dataLocalService = inject(DataLocalService);

    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    public readonly btnDownloadConfig: IBtnConfig = {
        title: 'Скачать файл',
        color: 'accent',
        icon: 'download',
    };
    public readonly btnUploadConfig: IBtnConfig = {
        title: 'Выбрать файл с данными',
        color: 'accent',
        icon: 'upload',
    };
    public readonly downloadList: IDataList[] = [
        {
            id: 'games',
            name: 'Список игр',
        },
        {
            id: 'platforms',
            name: 'Список платформ',
        },
        {
            id: 'gameGroups',
            name: 'Список групп',
        },
        {
            id: 'gamingAccounts',
            name: 'Список игровых аккаунтов',
        },
    ];
    public readonly uploadList: IDataList[] = [
        {
            id: 'games',
            name: 'Список игр',
        },
        {
            id: 'gameGroups',
            name: 'Список групп',
        },
        {
            id: 'gamingAccounts',
            name: 'Список игровых аккаунтов',
        },
    ];

    private _selectedUploadId: IDataList['id'];

    private readonly _destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public downloadAllFiles(): void {
        this._downloadGames();
        this._downloadPlatforms();
        this._downloadGameGroups();
    }

    public selectDownloadData(data: IDataList): void {
        switch (data.id) {
            case 'games': {
                this._downloadGames();
                break;
            }
            case 'platforms': {
                this._downloadPlatforms();
                break;
            }
            case 'gameGroups': {
                this._downloadGameGroups();
                break;
            }
            case 'gamingAccounts': {
                this._downloadGamingAccounts();
                break;
            }
        }
    }

    public selectUploaddData(data: IDataList): void {
        this._selectedUploadId = data.id;

        this.fileInput.nativeElement.click();
    }

    private _downloadGames(): void {
        this._gamesService.getGames()
            .pipe(
                takeUntil(this._destroy$),
                catchError(error => {
                    console.error(error);

                    return EMPTY;
                }),
            )
            .subscribe(games => {
                this._downloadFile(games, EYdxFileNames.GAMES);
            });
    }

    private _downloadPlatforms(): void {
        this._platformsService.getPlatforms()
            .pipe(
                takeUntil(this._destroy$),
                catchError(error => {
                    console.error(error);

                    return EMPTY;
                }),
            )
            .subscribe(platforms => {
                this._downloadFile(platforms, EYdxFileNames.PLATFORMS);
            });
    }

    private _downloadGameGroups(): void {
        this._gameGroupsService.getGameGroups()
            .pipe(
                takeUntil(this._destroy$),
                catchError(error => {
                    console.error(error);

                    return EMPTY;
                }),
            )
            .subscribe(gameGroups => {
                this._downloadFile(gameGroups, EYdxFileNames.GAMES_GROUPS);
            });
    }

    private _downloadGamingAccounts(): void {
        this._gamingAccountsService.getGamingAccounts()
            .pipe(
                takeUntil(this._destroy$),
                catchError(error => {
                    console.error(error);

                    return EMPTY;
                }),
            )
            .subscribe(gamingAccounts => {
                this._downloadFile(gamingAccounts, EYdxFileNames.GAMING_ACCOUNTS);
            });
    }

    private _downloadFile<T>(data: T[], name: string) {
        const options: FileGenerationOptions = {
            filename: `${new Date().getTime()}_${name}`,
        };

        const file = this._fileService.generateFile(data, options);

        this._fileService.downloadFile(file);
    }

    public onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;

        if (input.files && input.files.length > 0) {
            this._onSelectUploadFile(input.files[0])
        }
    }

    private _onSelectUploadFile(file: File) {
        this._readJsonFile(file)
            .then(data => {
                switch(this._selectedUploadId) {
                    case 'games': {
                        const isCorrect = this._gamesService.checkStructure(data as IGame[]);

                        if (isCorrect) {
                            this._dataLocalService.setGames(data as IGame[]);

                            this._openSnackBar('УСПЕШНО! Игры проверены и загружены, обновите страницу!');
                        } else {
                            this._openSnackBar('ОШИБКА! Структура данных игр не верна!');
                        }

                        break;
                    }
                    case 'gameGroups': {
                        const isCorrect = this._gameGroupsService.checkStructure(data as IGameGroup[]);

                        if (isCorrect) {
                            this._dataLocalService.setGameGroups(data as IGameGroup[]);

                            this._openSnackBar('УСПЕШНО! Группы проверены и загружены, обновите страницу!');
                        } else {
                            this._openSnackBar('ОШИБКА! Структура данных групп не верна!');
                        }

                        break;
                    }
                    case 'gamingAccounts': {
                        const isCorrect = this._gamingAccountsService.checkStructure(data as IGamingAccount[]);

                        if (isCorrect) {
                            this._dataLocalService.setGamingAccounts(data as IGamingAccount[]);

                            this._openSnackBar('УСПЕШНО! Аккаунты проверены и загружены, обновите страницу!');
                        } else {
                            this._openSnackBar('ОШИБКА! Структура данных аккаунтов не верна!');
                        }

                        break;
                    }
                }
            });
    }

    private _readJsonFile(file: File): Promise<unknown[]> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                try {
                    const result = JSON.parse(reader.result as string);

                    resolve(result);
                } catch (err) {
                    console.error('Ошибка парсинга:', err);
                    reject(err);
                }
            };

            reader.onerror = () => {
                console.error('Ошибка чтения файла:', reader.error);
                reject(reader.error);
            };

            reader.readAsText(file);
        });
    }

    private _openSnackBar(message: string, action = 'Закрыть'): void {
        this._snackBar.open(message, action, {
            duration: 5000
        });
    }
}
