import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import type { IGame } from '../../types/games.interfaces';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
    selector: 'app-games-list',
    templateUrl: './games-list.component.html',
    styleUrls: [ './games-list.component.scss' ],
    standalone: true,
    imports: [
        MatListModule,
        GameCardComponent,
    ],
})
export class GamesListComponent {
    @Input() gameList: IGame[] = [];
}
