import { Component, inject, Input } from "@angular/core";
import { Router } from "@angular/router";

import { GamesService } from "../../services/games.service";
import { PlatformsService } from "../../services/platforms.service";
import type { IGame } from "../../types/games.interfaces";

@Component({
    selector: 'app-game-card',
    templateUrl: './game-card.component.html',
    styleUrls: [ './game-card.component.scss' ],
    standalone: true,
    providers: [
        PlatformsService,
        GamesService,
    ],

})
export class GameCardComponent {
    public platformsService = inject(PlatformsService);
    private readonly _gamesService = inject(GamesService);
    private readonly _router = inject(Router);

    @Input() gameData: IGame = this._gamesService.mockGame;
    @Input() index = 0;


    public onClick(): void {
        this._router.navigate([ '/game', this.gameData.id ]);
    }
}
