
import { ChangeDetectorRef, Component, inject,type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions,MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { type MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { ExplorerService } from '../../../services/explorer.service';

@Component({
    selector: 'app-auth-dialog',
    templateUrl: './auth-dialog.component.html',
    styleUrls: [ './auth-dialog.component.scss' ],
    providers: [
        ExplorerService,
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
    ],
})
export class AuthDialogComponent implements OnInit {
    public readonly dialogRef = inject(MatDialogRef<AuthDialogComponent>);
    public readonly authService = inject(AuthService);
    public readonly route = inject(ActivatedRoute);
    public readonly explorerService = inject(ExplorerService);
    private readonly _cdr = inject(ChangeDetectorRef);

    public tokenField: string | null;
    public cliendIdField: string | null;
    public cloudChecked = false;

    constructor () {
        // this._handleOAuthCallback();
    }

    public ngOnInit(): void {
        const token = this.authService.getToken();

        if (token) {
            this.tokenField = token;
        }

        this.cloudChecked = this.authService.getCloudEnabled();
    }

    public save() {
        if (!this.authService.hasCliendId() && this.cliendIdField) {
            this.authService.saveCliendId(this.cliendIdField);
        } else if (!this.authService.hasToken() && this.tokenField) {
            this.authService.saveToken(this.tokenField);
        }
    }

    public clearToken() {
        this.tokenField = null;

        this.authService.clearToken();
    }

    public login() {
        window.open(this.authService.getAuthUrl());
    }

    public onToggleChange(event: MatSlideToggleChange): void {
        if (event.checked) {
            this.authService.saveCloudEnabled(event.checked);
        } else {
            this.authService.clearToken();
            this.authService.clearCliendId();
            this.authService.clearCloudEnabled();
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
