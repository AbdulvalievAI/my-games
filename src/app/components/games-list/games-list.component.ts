import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import type { IGame } from '../../types/games.interfaces';
import { EmptyCardComponent } from "../empty-card/empty-card.component";
import { GameItemComponent } from '../game-item/game-item.component';

@Component({
    selector: 'app-games-list',
    templateUrl: './games-list.component.html',
    styleUrls: [ './games-list.component.scss' ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatListModule,
        GameItemComponent,
        ScrollingModule,
        EmptyCardComponent
    ],
})
export class GamesListComponent {
    @Input() gameList: IGame[] = [];

    public trackByGame(index: number, game: IGame): string {
        return game.id;
    }
}
