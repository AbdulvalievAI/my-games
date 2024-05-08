import { Component, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { IYesNoDialogSettings } from './yes-no-dialog.component.interface';

@Component({
  selector: 'yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.scss']
})
export class YesNoDialogComponent {
    private defaultSettings: IYesNoDialogSettings = {
        yesTextButton: 'Согласиться',
        noTextButton: 'Отмена',
        textDialog: 'Подтвердить действие?',
    };
    
    constructor(
        public dialogRef: MatDialogRef<YesNoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _settings: IYesNoDialogSettings) {}
        
    public get settings(): IYesNoDialogSettings {
        if (this._settings) {
            return this._settings;
        } else {
            return this.defaultSettings;
        }
    }    
}
