import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
} from "@angular/material/card";
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-error-dialog',
    templateUrl: './error-dialog.component.html',
    styleUrls: [ './error-dialog.component.scss' ],
    standalone: true,
    imports: [
        MatDialogModule,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatIcon,
        MatCardActions,
        MatButtonModule,
        MatTooltipModule,
    ],
})
export class ErrorDialogComponent {
    public readonly dialogRef = inject(MatDialogRef<ErrorDialogComponent>);
    public readonly data: Error | string = inject<Error>(MAT_DIALOG_DATA);
    private readonly _snackBar = inject(MatSnackBar);

    public copyTextError(): void {
        navigator.clipboard.writeText(JSON.stringify(this.data.toString(), null, 2));

        this._openSnackBar('Текст ошибки скопирован в буфер обмена')
    }

    private _openSnackBar(message: string, action = 'Закрыть'): void {
        this._snackBar.open(message, action, {
            duration: 2000
        });
    }
}
