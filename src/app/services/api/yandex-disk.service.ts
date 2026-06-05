import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, type OnDestroy } from '@angular/core';
import { EMPTY, map, type Observable, Subject, switchMap, takeUntil } from 'rxjs';

import { yandexConfig } from '../../config/yandex.config';
import type { IAnyObject } from '../../types/common.interfaces';
import { AuthService } from './auth.service';

export interface IYdxDiskDownRes {
    method: string;
    href: string;
    templated: boolean;
}

export interface IYdxDiskUpRes {
    method: string;
    href: string;
    templated: boolean;
    operation_id: string;
}

export interface IYdxUserInfo {
    total_space: number;
    used_space: number;
    trash_size: number;
    max_file_size: number;
    paid_max_file_size: number;
    photounlim_size: number;
    system_folders: IAnyObject;
    is_paid: boolean;
    revision: number;
    user: {
        uid: string;
        login: string;
        display_name: string;
        country: string;
        is_child: boolean;
        reg_time: string;
    },
    unlimited_autoupload_enabled: boolean;
    reg_time: string;
    is_idm_managed_public_access: boolean;
    is_idm_managed_folder_address_access: boolean;
    is_sync_shared_folder_desktop: boolean;
    is_sync_vd_desktop: boolean;
    payment_flow: boolean;
    hide_screenshots_in_photoslice: boolean;
    is_legal_entity: boolean;
    monthly_traffic_limit: number
    monthly_traffic_limit_upgrades: {
        pro: number;
    };
    file_size_limit_upgrades: {
        paid: number;
        pro: number;
    }
}

export enum EPathFiles {
    GAMES = 'db_games.json',
    GAMES_GROUPS = 'db_games_groups.json',
    PLATFORMS = 'platforms.json',
}

enum EUrls {
    UPLOAD = 'resources/upload',
    DOWNLOAD = 'resources/download',
}

@Injectable()
export class YdxDiskService implements OnDestroy {
    private readonly _http = inject(HttpClient);
    private readonly _authService = inject(AuthService);
    private readonly _destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public uploadFile(file: File, typeFile: EPathFiles) {
        const headers = this._createAuthHeaders();
        const path = this._getPathFile(typeFile);

        return this._http
            .get<IYdxDiskUpRes>(`${yandexConfig.diskUrl}${EUrls.UPLOAD}`, {
                params: {
                    path,
                    overwrite: true,
                },
                headers,
            })
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
    public downloadFile(typeFile: EPathFiles) {
        const headers = this._createAuthHeaders();
        const path = this._getPathFile(typeFile);

        return this._http
            .get<IYdxDiskDownRes>(
                `${yandexConfig.diskUrl}${EUrls.DOWNLOAD}`,
                {
                    params: { path },
                    headers,
                }
            )
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

                        return jsonData as unknown;

                    } catch (error) {
                        console.error(error);

                        return EMPTY;
                    }
                }),
            )
    }

    public checkAccess(token?: string): Observable<boolean> {
        const headers = this._createAuthHeaders(token);

        return this._http
            .get<IYdxUserInfo>(`${yandexConfig.diskUrl}`, {
                headers,
            })
            .pipe(
                takeUntil(this._destroy$),
                map(userInfo => !!userInfo?.user?.login),
            );
    }

    private _createAuthHeaders(token?: string) {
        return new HttpHeaders({
            Authorization: `OAuth ${token || this._authService.getToken()}`,
        });
    };

    private _getPathFile(typeFile: EPathFiles): string {
        switch (typeFile) {
            case EPathFiles.GAMES: {
                return `${yandexConfig.diskFolderPath}/${EPathFiles.GAMES}`;
            }
            case EPathFiles.GAMES_GROUPS: {
                return `${yandexConfig.diskFolderPath}/${EPathFiles.GAMES_GROUPS}`;
            }
            case EPathFiles.PLATFORMS: {
                return `${yandexConfig.diskFolderPath}/${EPathFiles.PLATFORMS}`;
            }
        }
    }
}
