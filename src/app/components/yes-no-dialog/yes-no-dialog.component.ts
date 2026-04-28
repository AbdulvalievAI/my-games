import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';

import type { IYesNoDialogSettings } from './yes-no-dialog.component.interface';

@Component({
    selector: 'app-yes-no-dialog',
    templateUrl: './yes-no-dialog.component.html',
    styleUrls: [ './yes-no-dialog.component.scss' ],
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule,
    ],
})
export class YesNoDialogComponent {
    readonly dialogRef = inject(MatDialogRef<YesNoDialogComponent>);
    private readonly _settings = inject<IYesNoDialogSettings>(MAT_DIALOG_DATA);

    private readonly _defaultSettings: IYesNoDialogSettings = {
        yesTextButton: 'Согласиться',
        noTextButton: 'Отмена',
        textDialog: 'Подтвердить действие?',
    };

    public get settings(): IYesNoDialogSettings {
        if (this._settings) {
            return this._settings;
        } else {
            return this._defaultSettings;
        }
    }
}
