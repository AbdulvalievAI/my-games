import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { IGame } from '../../data/games/games.interfaces';
import { GamesService } from '../../data/games/games.service';
import { PlatformsService } from '../../data/platforms/platforms.service';

@Component({
  selector: 'game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
    @Input() gameData: IGame = this._gamesService.mockGame;
    @Input() index: number = 0;

    constructor (
        public platformsService: PlatformsService,
        private _gamesService: GamesService,
        private _router: Router,
    ) {
    }
    
    public onClick() {
        this._router.navigate(['/game', this.gameData.id]);
    }
}
