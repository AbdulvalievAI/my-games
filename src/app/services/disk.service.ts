import { HttpClient, HttpHeaders, provideHttpClient } from '@angular/common/http';
import { type ApplicationConfig, inject, Injectable } from '@angular/core';
import { EMPTY, map, switchMap } from 'rxjs';

import { yandexConfig } from '../config/yandex.config';
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
export class DiskService {
    public readonly http = inject(HttpClient);
    public readonly authService = inject(AuthService);

    /*     public async uploadFile(file: File, path: string) {
            const headers = new HttpHeaders({
                Authorization: `Bearer ${this.token}`,
            });

            const response = await this.http
                .get(`${this.baseUrl}resources/upload`, {
                    params: { path },
                    headers,
                })
                .toPromise();

            const uploadUrl = response && response.href;

            return this.http
                .put(uploadUrl, file, {
                    headers: new HttpHeaders({
                        'Content-Type': file.type,
                    }),
                })
                .toPromise();
        } */

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
    getJsonFile(path: string) {
        const token = this.authService.getToken();
        const headers = new HttpHeaders({
            Authorization: `OAuth ${token}`,
        });

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
