import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { yandexAuthConfig } from '../../config/yandex.config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public readonly http = inject(HttpClient);

    public readonly useFake = false;

    private readonly _keyLsToken = 'yandex_token';
    private readonly _keyLsClientId = 'client_id';

    // Метод для генерации URL авторизации
    public getAuthUrl(clientId: string): string {
        if (clientId) {
            const params = new URLSearchParams({
                response_type: 'token',
                client_id: clientId,
                redirect_uri: yandexAuthConfig.redirectUri
            });

            return `${yandexAuthConfig.authUrl}?${params.toString()}`;
        }

        throw new Error('Error create url')
    }

    public openWindowToken(clientId: string) {
        window.open(this.getAuthUrl(clientId));
    }

    public logout() {
        this.clearClientId();
        this.clearToken();
    }

    public isAuthorized(): boolean {
        return this.hasToken() && this.hasClientId();
    }

    /** Token */

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

    /** ClientId */

    public hasClientId(): boolean {
        return !!localStorage.getItem(this._keyLsClientId);
    }

    public getClientId(): string | null {
        return localStorage.getItem(this._keyLsClientId);
    }

    public saveClientId(id: string): void {
        localStorage.setItem(this._keyLsClientId, id);
    }

    public clearClientId() {
        localStorage.removeItem(this._keyLsClientId);
    }
}