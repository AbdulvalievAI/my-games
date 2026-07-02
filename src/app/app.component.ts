import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { RouterModule } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY } from 'rxjs';

import { DataService } from './services/api/data/data.service';
import { DialogService } from './services/dialog.service';
import { ThemeService } from './services/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
    standalone: true,
    providers: [
        ThemeService,
        DialogService,
    ],
    imports: [
        CommonModule,
        RouterModule,
        AsyncPipe,
        MatProgressSpinner,
    ],
})
export class AppComponent implements OnInit {
    public readonly themeService = inject(ThemeService);
    private readonly _dataService = inject(DataService);
    private readonly _dialogService = inject(DialogService);

    public isLoad$ = new BehaviorSubject<boolean>(true);

    ngOnInit(): void {
        this.themeService.initializeTheme();
        this._dataService.syncData()
            .pipe(
                catchError(error => {
                    console.error(error);
                    this._dialogService.openErrorDialog(error);

                    this.isLoad$.next(false);

                    return EMPTY;
                }),
            )
            .subscribe(() => this.isLoad$.next(false))
    }
}
