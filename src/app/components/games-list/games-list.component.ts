import { Component, Input } from '@angular/core';

import { IGame } from '../../data/games/games.interfaces';

@Component({
  selector: 'games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent {
    @Input() gameList: IGame[] = [];
}
