import { HttpClient, HttpHeaders, provideHttpClient } from '@angular/common/http';
import { type ApplicationConfig, inject, Injectable,type OnDestroy } from '@angular/core';
import { EMPTY, map, Subject, switchMap, takeUntil } from 'rxjs';

import { yandexConfig } from '../config/yandex.config';
import type { IAnyObject } from '../types/common.interfaces';
import { AuthService } from './auth.service';

export const appConfig: ApplicationConfig = {
    providers: [ provideHttpClient() ],
};

export interface IResponce {
    method: string;
    href: string;
    templated: boolean;
}

@Injectable()
export class DiskService implements OnDestroy {
    public readonly http = inject(HttpClient);
    public readonly authService = inject(AuthService);
    private readonly _destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public uploadFile(file: File, path: string) {
        const headers = this._createAuthHeaders();

        return this.http
            .get(`${yandexConfig.diskUrl}resources/upload`, {
                params: { path },
                headers,
            })
            .pipe(
                takeUntil(this._destroy$),
                switchMap(response => {
                    const upload = response as IAnyObject;
                    const href = upload['href'] as string;

                    return this.http
                        .put(href, file, {
                            headers: new HttpHeaders({
                                'Content-Type': file.type,
                            }),
                        })
                }),
            );
    }

    /*     public downloadFile(path: string, filename: string) {
            const headers = new HttpHeaders({
                Authorization: `Bearer ${this.token}`,
            });

            this.http
                .get(`${this.baseUrl}resources/download`, {
                    params: { path },
                    headers,
                    responseType: 'blob' as 'json',
                })
                .subscribe(blob => {
                    saveAs(blob as Blob, filename);
                });
        } */

    /**
     * Загружает JSON‑файл с Яндекс Диска
     * @param path Путь к файлу на Диске (например: 'folder/data.json')
     * @returns Observable с содержимым JSON‑файла
     * @example
     * this._diskService.getJsonFile('OpenVPN/test.json')
            .subscribe(res => {
                console.log('===> res', res);
            });
     */
    public getJsonFile(path: string) {
        const headers = this._createAuthHeaders();

        return this.http.get<IResponce>(
            `${yandexConfig.diskUrl}resources/download`,
            {
                params: { path },
                headers,
            }
        )
        .pipe(
            map((response => response.href)), // Извлекаем URL из ответа
            switchMap((downloadUrl: string) =>
                // Шаг 2: Загружаем сами данные по полученной ссылке
                this.http.get(downloadUrl, { responseType: 'text' })
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
            })
        )
    }

    private _createAuthHeaders() {
        return new HttpHeaders({
            Authorization: `OAuth ${this.authService.getToken()}`,
        });
    };

/*     loadJsonArray(path: string, token: string) {
        const headers = {
            Authorization: `Bearer ${token}`
        };

        // Шаг 1: Получаем ссылку для скачивания
        return this.http.get(
            `${this.baseUrl}resources/download`,
            {
                params: { path },
                headers
            }
        ).pipe(
            map((response: unknown) => response.href), // Извлекаем URL из ответа
            switchMap((downloadUrl: string) =>
                // Шаг 2: Загружаем сами данные по полученной ссылке
                this.http.get(downloadUrl, { responseType: 'text' })
            ),
            map((fileContent: string) => {
                try {
                    // Шаг 3: Парсим текст в JSON
                    const jsonData = JSON.parse(fileContent);

                    // Проверяем, что это массив
                    if (!Array.isArray(jsonData)) {
                        throw new Error('Файл не содержит массив данных');
                    }

                    return jsonData;
                } catch (error) {
                    throw new Error(`Ошибка парсинга JSON: ${error.message}`);
                }
            })
        );
    } */
}
