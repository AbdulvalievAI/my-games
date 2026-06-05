
import { AsyncPipe } from '@angular/common';
import { Component, inject, type OnDestroy, type OnInit } from '@angular/core';
import { FormBuilder, type FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BehaviorSubject, catchError, EMPTY, Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../../services/api/auth.service';
import { YdxDiskService } from '../../../services/api/yandex-disk.service';
import type { IAuthForm } from './auth-dialog.interface';

@Component({
    selector: 'app-auth-dialog',
    templateUrl: './auth-dialog.component.html',
    styleUrls: [ './auth-dialog.component.scss' ],
    providers: [
        AuthService,
        YdxDiskService,
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
        MatProgressSpinnerModule,
        AsyncPipe,
    ],
})
export class AuthDialogComponent implements OnInit, OnDestroy {
    public readonly dialogRef = inject(MatDialogRef<AuthDialogComponent>);
    public readonly authService = inject(AuthService);
    private readonly _fb = inject(FormBuilder);
    private readonly _ydxDiskService = inject(YdxDiskService);
    private readonly _snackBar = inject(MatSnackBar);

    public authForm: FormGroup<IAuthForm>;
    public disabledForm = true;

    private readonly _destroy$ = new Subject<void>();
    public isLoad$ = new BehaviorSubject<boolean>(false);

    public ngOnInit(): void {
        this._initForm();
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
        this.isLoad$.complete();
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

    public login() {
        if (this.authForm.valid) {
            const { clientId, token } = this.authForm.getRawValue();

            if (clientId && token) {
                this.isLoad$.next(true);

                this._ydxDiskService.checkAccess(token)
                    .pipe(
                        takeUntil(this._destroy$),
                        catchError(error => {
                            console.error(error);
                            this._openSnackBar('⛔ Ошибка авторизации! ⛔');
                            this.isLoad$.next(false);

                            return EMPTY;
                        }),
                    )
                    .subscribe(isAccess => {
                        if (isAccess) {
                            if (clientId) {
                                this.authService.saveCliendId(clientId);
                            }

                            if (token) {
                                this.authService.saveToken(token);
                            }

                            this._initForm();

                            this._openSnackBar('✅ Успешная авторизация! ✅');
                        } else {
                            console.error(isAccess);
                            this._openSnackBar('⛔ Ошибка авторизации! ⛔');
                        }

                        this.isLoad$.next(false);
                    });
            }
        }
    }

    public logout() {
        this.authService.logout();
        this._initForm();
    }

    public openWindowToken() {
        const clientId = this.authForm.value.clientId;

        if (clientId) {
            this.authService.openWindowToken(clientId);
        }
    }

    private _openSnackBar(message: string, action = 'Закрыть'): void {
        this._snackBar.open(message, action, {
            duration: 5000
        });
    }
}
