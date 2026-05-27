import { Component, inject, type OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';

import { DialogService } from '../../services/dialog.service';
import { ExplorerService } from '../../services/explorer.service';
import { GamesService } from '../../services/games.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: [ './settings.component.scss' ],
    standalone: true,
    providers: [
        DialogService,
        ExplorerService,
    ],
    imports: [
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
    ],
})
export class SettingsComponent implements OnDestroy {
    public readonly explorerService = inject(ExplorerService);
    public readonly dialogService = inject(DialogService);
    private readonly _gamesService = inject(GamesService);

    private readonly _destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public copyGamesList(): void {
        this._gamesService.getGames()
            .pipe(
                takeUntil(this._destroy$),
                catchError(error => {
                    console.error(error);
                    this.dialogService.openErrorDialog(error);

                    return EMPTY;
                }),
            )
            .subscribe(game => {
                navigator.clipboard.writeText(JSON.stringify(game, null, 2));
            });
    }

    public copyGamesListFile(): void {
        this._gamesService.getGames()
            .pipe(
                takeUntil(this._destroy$),
                catchError(error => {
                    console.error(error);
                    this.dialogService.openErrorDialog(error);

                    return EMPTY;
                }),
            )
            .subscribe(game => {
                const element = document.createElement('a');

                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(game, null, 4)));
                element.setAttribute('download', `GamesList_${new Date().getTime()}.json`);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            });
    }
}
