import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, type OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, type Observable, of, Subject, switchMap, takeUntil, throwError } from 'rxjs';

import { yandexDiskConfig } from '../../config/yandex.config';
import type { IResDownloadFile } from '../../types/api.interfaces';
import type { IYdxDiskDownRes, IYdxDiskUpRes, IYdxErrorRes, IYdxFolderInfo, IYdxUserInfo } from '../../types/yandex-disk.interface';
import { AuthService } from './auth.service';

export enum EPathFiles {
    GAMES = 'db_games.json',
    GAMES_GROUPS = 'db_games_groups.json',
    PLATFORMS = 'db_platforms.json',
}

enum EUrls {
    FOLDER = 'resources',
    UPLOAD = 'resources/upload',
    DOWNLOAD = 'resources/download',
}

@Injectable()
export class YdxDiskService implements OnDestroy {
    private readonly _http = inject(HttpClient);
    private readonly _authService = inject(AuthService);
    private readonly _destroy$ = new Subject<void>();
    private readonly _snackBar = inject(MatSnackBar);

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public uploadFile(file: File, typeFile: EPathFiles): Observable<boolean> {
        const url = `${yandexDiskConfig.diskUrl}${EUrls.UPLOAD}`;
        const params = {
            headers: this._createAuthHeaders(),
            params: {
                path: this._getPathFile(typeFile),
                overwrite: true,
            },
        };

        return this._http
            .get<IYdxDiskUpRes>(url, params)
            .pipe(
                takeUntil(this._destroy$),
                switchMap(response => {
                    const href = response['href'];

                    return this._http
                        .put(href, file, {
                            headers: new HttpHeaders({
                                'Content-Type': file.type,
                            }),
                        })
                        .pipe(
                            map(() => {
                                return true;
                            }),
                        );
                }),
                catchError((error: IYdxErrorRes) => {
                    this._error(error);

                    return throwError(() => error);
                }),
            );
    }

    /**
     * Загружает  JSON‑файл с Яндекс Диска
     * @param path Путь к файлу на Диске (например: 'folder/data.json')
     * @returns Observable с содержимым JSON‑файла
     * @example
     * this._diskService.getJsonFile('OpenVPN/test.json')
            .subscribe(res => {
                console.log('===> res', res);
            });
     */
    public downloadFile<T>(typeFile: EPathFiles): Observable<IResDownloadFile<T>> {
        const url = `${yandexDiskConfig.diskUrl}${EUrls.DOWNLOAD}`;
        const params = {
            headers: this._createAuthHeaders(),
            params: {
                path: this._getPathFile(typeFile),
            },
        };

        return this._http
            .get<IYdxDiskDownRes>(url, params)
            .pipe(
                takeUntil(this._destroy$),
                map((response => response.href)), // Извлекаем URL из ответа
                switchMap((downloadUrl: string) =>
                    // Шаг 2: Загружаем сами данные по полученной ссылке
                    this._http.get(downloadUrl, { responseType: 'text' })
                ),
                map(fileContent => {
                    try {
                        const jsonData = JSON.parse(fileContent);

                        if (!Array.isArray(jsonData)) {
                            throw new Error('Файл не содержит массив данных');
                        }

                        return {
                            status: true,
                            jsonData: jsonData,
                        };
                    } catch (error) {
                        console.error(error);
                        this._snackBar.open(error as string, 'Закрыть', { duration: 5000 });

                        return {
                            status: false,
                            jsonData: [],
                        };;
                    }
                }),
                catchError((error: IYdxErrorRes) => {
                    if (error.status === 404) {
                        const res: IResDownloadFile<T> = {
                            status: false,
                            jsonData: [],
                        };

                        return of(res);
                    }

                    this._error(error);

                    return throwError(() => error);
                })
            );
    }

    public checkAccess(token?: string): Observable<boolean> {
        const url = yandexDiskConfig.diskUrl;
        const params = {
            headers: this._createAuthHeaders(token),
        };

        return this._http
            .get<IYdxUserInfo>(url, params)
            .pipe(
                takeUntil(this._destroy$),
                map(userInfo => !!userInfo?.user?.login),
                catchError((error: IYdxErrorRes) => {
                    this._error(error);

                    return throwError(() => error);
                }),
            );
    }

    public getFolderContents(): Observable<string[]> {
        const url = `${yandexDiskConfig.diskUrl}${EUrls.FOLDER}`;
        const params = {
            headers: this._createAuthHeaders(),
            params: {
                path: yandexDiskConfig.folderPath,
                limit: '5',
            }
        };

        return this._http
            .get<IYdxFolderInfo>(url, params)
            .pipe(
                takeUntil(this._destroy$),
                map(filderInfo => {
                    return filderInfo._embedded.items.map(fileItem => fileItem.name);
                }),
                catchError((error: IYdxErrorRes) => {
                    this._error(error);

                    return throwError(() => error);
                }),
            );
    }

    public createFolder(token?: string): Observable<boolean> {
        const url = `${yandexDiskConfig.diskUrl}${EUrls.FOLDER}`;
        const params = {
            headers: this._createAuthHeaders(token),
            params: new HttpParams().set('path', yandexDiskConfig.folderPath)
        };

        return this._http
            .put(url, null, params)
            .pipe(
                takeUntil(this._destroy$),
                map(() => {
                    return true
                }),
                catchError((error: IYdxErrorRes) => {
                    this._error(error);

                    return throwError(() => error);
                }),
            );
    }

    public checkExistsFolder(token?: string): Observable<boolean> {
        const url = `${yandexDiskConfig.diskUrl}${EUrls.FOLDER}`;
        const params = {
            headers: this._createAuthHeaders(token),
            params: new HttpParams().set('path', yandexDiskConfig.folderPath),
        };

        return this._http.get(url, params)
            .pipe(
                takeUntil(this._destroy$),
                map(() => true),
                catchError((error: IYdxErrorRes) => {
                    if (error.status === 404) {
                        return of(false);
                    }

                    this._error(error);

                    return throwError(() => error);
                })
            );
    }

    private _createAuthHeaders(token?: string): HttpHeaders {
        return new HttpHeaders({
            Authorization: `OAuth ${token || this._authService.getToken()}`,
        });
    };

    private _getPathFile(typeFile: EPathFiles): string {
        switch (typeFile) {
            case EPathFiles.GAMES: {
                return `${yandexDiskConfig.folderPath}/${EPathFiles.GAMES}`;
            }
            case EPathFiles.GAMES_GROUPS: {
                return `${yandexDiskConfig.folderPath}/${EPathFiles.GAMES_GROUPS}`;
            }
            case EPathFiles.PLATFORMS: {
                return `${yandexDiskConfig.folderPath}/${EPathFiles.PLATFORMS}`;
            }
        }
    }

    private _error(error: IYdxErrorRes): void {
        console.error(error);
        this._snackBar.open(error.error?.message || error.message, 'Закрыть', { duration: 5000 });
    }
}
