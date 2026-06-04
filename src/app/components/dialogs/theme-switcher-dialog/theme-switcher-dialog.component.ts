import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField,MatLabel, MatOption, MatSelect, type MatSelectChange } from "@angular/material/select";

import { ThemeService } from '../../../services/theme.service';

@Component({
    selector: 'app-theme-switcher-dialog',
    templateUrl: './theme-switcher-dialog.component.html',
    styleUrls: [ './theme-switcher-dialog.component.scss' ],
    standalone: true,
    providers: [
        ThemeService,
    ],
    imports: [
        MatOption,
        MatSelect,
        MatLabel,
        MatFormField,
        MatCard,
        MatCardHeader,
        MatCardContent,
        MatCardTitle
    ],
})
export class ThemeSwitcherComponent {
    public readonly dialogRef = inject(MatDialogRef<ThemeSwitcherComponent>);
    private readonly _themeService = inject(ThemeService);

    public selectedTheme = 'indigo-pink';

    constructor () {
        this.selectedTheme = this._themeService.getTheme();
    }

    public onThemeChange(event: MatSelectChange<unknown>): void {
        const value = event['value'] as string;

        if (value) {
            this._themeService.setTheme(value);
        }
    }
}
