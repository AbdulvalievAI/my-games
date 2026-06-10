import { Component, inject, type OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions,MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';

import { GameGroupsService } from '../../../services/api/game-groups.service';
import { GamesService } from '../../../services/api/games.service';
import { PlatformsService } from '../../../services/api/platforms.service';
import { EPathFiles } from '../../../services/api/yandex-disk.service';
import { type FileGenerationOptions, FileService } from '../../../services/file.service';
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
    ],
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
    private readonly _gameGroupsService = inject(GameGroupsService);
    private readonly _gamesService = inject(GamesService);
    private readonly _platformsService = inject(PlatformsService);
    private readonly _fileService = inject(FileService);

    public readonly btnConfig: IBtnConfig = {
        title: 'Скачать файл',
        color: 'accent',
        icon: 'download',
    };
    public readonly dataList: IDataList[] = [
        {
            id: '1',
            name: 'Список игр',
        },
        {
            id: '2',
            name: 'Список платформ',
        },
        {
            id: '3',
            name: 'Список групп',
        },
    ];

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

    public selectData(data: IDataList): void {
        switch(data.id) {
            case '1': {
                this._downloadGames();
                break;
            }
            case '2': {
                this._downloadPlatforms();
                break;
            }
            case '3': {
                this._downloadGameGroups();
                break;
            }
        }
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
                this._downloadFile(games, EPathFiles.GAMES);
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
                this._downloadFile(platforms, EPathFiles.GAMES_GROUPS);
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
                this._downloadFile(gameGroups, EPathFiles.PLATFORMS);
            });
    }

    private _downloadFile(data: unknown, name: string) {
         const options: FileGenerationOptions = {
            filename: `${new Date().getTime()}_${name}`,
        };

        const file = this._fileService.generateFile(data, options);

        this._fileService.triggerDownload(file);
    }
}
