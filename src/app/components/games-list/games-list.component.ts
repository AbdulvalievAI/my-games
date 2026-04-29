import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import type { IGame } from '../../types/games.interfaces';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
    selector: 'app-games-list',
    templateUrl: './games-list.component.html',
    styleUrls: [ './games-list.component.scss' ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatListModule,
        GameCardComponent,
        MatCardModule,
        ScrollingModule,
    ],
})
export class GamesListComponent {
    @Input() gameList: IGame[] = [];

    public trackByGame(index: number, game: IGame): string {
        return game.id;
    }
}
