
import { Component, inject, type OnInit } from '@angular/core';
import { FormBuilder, type FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../services/api/auth.service';
import { ExplorerService } from '../../../services/explorer.service';
import type { IAuthForm } from './auth-dialog.interface';

@Component({
    selector: 'app-auth-dialog',
    templateUrl: './auth-dialog.component.html',
    styleUrls: [ './auth-dialog.component.scss' ],
    providers: [
        ExplorerService,
        AuthService,
    ],
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
        MatSlideToggleModule,
        ReactiveFormsModule,
    ],
})
export class AuthDialogComponent implements OnInit {
    public readonly dialogRef = inject(MatDialogRef<AuthDialogComponent>);
    public readonly authService = inject(AuthService);
    public readonly route = inject(ActivatedRoute);
    public readonly explorerService = inject(ExplorerService);
    private readonly _fb = inject(FormBuilder);

    public authForm: FormGroup<IAuthForm>;
    public disabledForm = true;

    constructor () {
        // this._handleOAuthCallback();
    }

    public ngOnInit(): void {
        this._initForm();
    }

    private _initForm(): void {
        this.disabledForm = this.authService.isAuthorized()

        const token = this.authService.getToken();
        const clientId = this.authService.getCliendId();

        this.authForm = this._fb.group({
            token: this._createTokenControl(token, this.disabledForm),
            clientId: this._createCliendIdControl(clientId, this.disabledForm),
        }) as FormGroup<IAuthForm>;
    }

    private _createTokenControl(token: string | null, disabled = false) {
        return this._fb.control({ value: token, disabled }, Validators.required);
    }

    private _createCliendIdControl(clientId: string | null, disabled = false) {
        return this._fb.control({ value: clientId, disabled }, [ Validators.required ]);
    }

    public save() {
        if (this.authForm.valid) {
            const { clientId, token } = this.authForm.getRawValue();

            if (clientId) {
                this.authService.saveCliendId(clientId);
            }

            if (token) {
                this.authService.saveToken(token);
            }

            this._initForm();
        }
    }

    public logout() {
        this.authService.logout();
        this._initForm();
    }

    public login() {
        const clientId = this.authForm.value.clientId;

        if (clientId) {
            this.authService.login(clientId);
        }
    }

    /*     private _handleOAuthCallback(): void {
            // Проверяем URL на наличие токена после авторизации
            this.route.fragment.subscribe(fragment => {
                if (fragment) {
                    const params = new URLSearchParams(fragment);


                    const accessToken = params.get('yandex_token');

                    if (accessToken) {
                        this.setToken(accessToken);

                        console.info('Токен получен и сохранён:', accessToken);

                        // this._explorerService.goToHome();
                    }
                }
            });
        } */
}
