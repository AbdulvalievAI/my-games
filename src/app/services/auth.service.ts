import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { yandexConfig } from '../config/yandex.config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public readonly http = inject(HttpClient);

    public readonly keyToken = 'yandex_token';
    public readonly keyCliendId = 'client_id';
    public readonly keyCloudEnabled = 'cloud_enabled'

    // Метод для генерации URL авторизации
    public getAuthUrl(): string {
        const cliendId = this.getCliendId();

        if (cliendId) {
            const params = new URLSearchParams({
                response_type: 'token',
                client_id: cliendId,
                redirect_uri: yandexConfig.redirectUri
            });

            return `${yandexConfig.authUrl}?${params.toString()}`;
        }

        throw new Error('Error create url')
    }

    // Проверка, есть ли токен в localStorage
    public hasToken(): boolean {
        return !!localStorage.getItem(this.keyToken);
    }

    // Получение токена из localStorage
    public getToken(): string | null {
        return localStorage.getItem(this.keyToken);
    }

    // Сохранение токена
    public saveToken(token: string): void {
        localStorage.setItem(this.keyToken, token);
    }

    public clearToken() {
        localStorage.removeItem(this.keyToken);
    }

    public hasCliendId(): boolean {
        return !!localStorage.getItem(this.keyCliendId);
    }

    public getCliendId(): string | null {
        return localStorage.getItem(this.keyCliendId);
    }

    public saveCliendId(id: string): void {
        localStorage.setItem(this.keyCliendId, id);
    }

    public clearCliendId() {
        localStorage.removeItem(this.keyCliendId);
    }

    public hasCloudEnabled(): boolean {
        return !!localStorage.getItem(this.keyCloudEnabled);
    }

    public getCloudEnabled(): boolean {
        const enabled = localStorage.getItem(this.keyCloudEnabled);

        return enabled === 'true' ? true : false;
    }

    public saveCloudEnabled(enabled: boolean): void {
        localStorage.setItem(this.keyCloudEnabled, String(enabled));
    }

    public clearCloudEnabled() {
        localStorage.removeItem(this.keyCloudEnabled);
    }
}