import { inject, Injectable } from "@angular/core";
import {
    MatDialog,
    type MatDialogConfig,
} from "@angular/material/dialog";

import { AuthDialogComponent } from "../components/dialogs/auth-dialog/auth-dialog.component";
import { DataDialogComponent } from "../components/dialogs/data-dialog/data-dialog.component";
import { ErrorDialogComponent } from "../components/dialogs/error-dialog/error-dialog.component";
import { ImageDialogComponent } from "../components/dialogs/image-dialog/image-dialog.component";
import { ThemeSwitcherComponent } from "../components/dialogs/theme-switcher-dialog/theme-switcher-dialog.component";
import { YesNoDialogComponent } from "../components/dialogs/yes-no-dialog/yes-no-dialog.component";
import type { IYesNoDialogSettings } from "../components/dialogs/yes-no-dialog/yes-no-dialog.interface";

@Injectable()
export class DialogService {
    private readonly _dialog = inject(MatDialog);

    public openErrorDialog(error: Error | string): void {
        this._dialog.closeAll();

        this._dialog.open(ErrorDialogComponent,
            {
                width: '540px',
                data: error,
            }
        );
    }

    public openImageDialog(logoUrl: string | null | undefined): void {
        if(!logoUrl) {
            return;
        }

        this._dialog.closeAll();

        this._dialog.open(ImageDialogComponent,
            {
                width: '50vh',
                height: '50vh',
                data: logoUrl,
            },
        );
    }

    public openYesNoDialog(settings: MatDialogConfig<IYesNoDialogSettings>) {
        this._dialog.closeAll();

        return this._dialog.open<YesNoDialogComponent, IYesNoDialogSettings>(
            YesNoDialogComponent,
            settings,
        );
    }

    public openAuthDialog() {
        this._dialog.closeAll();

        return this._dialog.open(
            AuthDialogComponent,
            {
                hasBackdrop: true,
                disableClose: true,
            },
        );
    }

    public openThemeSwitcher() {
        this._dialog.closeAll();

        return this._dialog.open(
            ThemeSwitcherComponent,
        );
    }

    public openDataDialog() {
        this._dialog.closeAll();

        return this._dialog.open(
            DataDialogComponent,
        );
    }
}

