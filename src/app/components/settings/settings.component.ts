import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { GamesService } from '../../services/games.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: [ './settings.component.scss' ],
    standalone: true,
    imports: [
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
    ],
})
export class SettingsComponent {
    private readonly _gamesService = inject(GamesService);

    public copyGamesList(): void {
        navigator.clipboard.writeText(JSON.stringify(this._gamesService.getGamesLC(), null, 2));
    }

    public copyGamesListFile(): void {
        const element = document.createElement('a');

        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this._gamesService.getGamesLC(), null, 2)));
        element.setAttribute('download', `GamesList_${new Date().getTime()}.json`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
/*
    public openCloud(): void {
        console.log('===> openAccount');
    }
*/
}
