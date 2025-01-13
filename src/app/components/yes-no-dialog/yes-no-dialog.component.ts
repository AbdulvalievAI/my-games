import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IYesNoDialogSettings } from './yes-no-dialog.component.interface';

@Component({
  selector: 'yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.scss']
})
export class YesNoDialogComponent {
    private _defaultSettings: IYesNoDialogSettings = {
        yesTextButton: 'Согласиться',
        noTextButton: 'Отмена',
        textDialog: 'Подтвердить действие?',
    };
    
    constructor(
        public dialogRef: MatDialogRef<YesNoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _settings: IYesNoDialogSettings,
    ) {}
        
    public get settings(): IYesNoDialogSettings {
        if (this._settings) {
            return this._settings;
        } else {
            return this._defaultSettings;
        }
    }    
}
