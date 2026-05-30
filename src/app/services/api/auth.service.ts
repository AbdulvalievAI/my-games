import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { yandexConfig } from '../../config/yandex.config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public readonly http = inject(HttpClient);

    private readonly _keyLsToken = 'yandex_token';
    private readonly _keyLsCliendId = 'client_id';
    private readonly _keyLsCloudEnabled = 'cloud_enabled'

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
        return !!localStorage.getItem(this._keyLsToken);
    }

    // Получение токена из localStorage
    public getToken(): string | null {
        return localStorage.getItem(this._keyLsToken);
    }

    // Сохранение токена
    public saveToken(token: string): void {
        localStorage.setItem(this._keyLsToken, token);
    }

    public clearToken() {
        localStorage.removeItem(this._keyLsToken);
    }

    public hasCliendId(): boolean {
        return !!localStorage.getItem(this._keyLsCliendId);
    }

    public getCliendId(): string | null {
        return localStorage.getItem(this._keyLsCliendId);
    }

    public saveCliendId(id: string): void {
        localStorage.setItem(this._keyLsCliendId, id);
    }

    public clearCliendId() {
        localStorage.removeItem(this._keyLsCliendId);
    }

    public hasCloudEnabled(): boolean {
        return !!localStorage.getItem(this._keyLsCloudEnabled);
    }

    public getCloudEnabled(): boolean {
        const enabled = localStorage.getItem(this._keyLsCloudEnabled);

        return enabled === 'true' ? true : false;
    }

    public saveCloudEnabled(enabled: boolean): void {
        localStorage.setItem(this._keyLsCloudEnabled, String(enabled));
    }

    public clearCloudEnabled() {
        localStorage.removeItem(this._keyLsCloudEnabled);
    }
}