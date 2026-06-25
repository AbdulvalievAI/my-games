import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import type { EPlatform } from '../../data/platforms';
import type { IGame, IGameGroup } from '../../types/games.interfaces';
import type { IGamingAccount } from '../../types/gaming-accounts.interfaces';
import type { IPlatform } from '../../types/platforms.interfaces';
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
export class GamesListComponent implements OnInit {
    @Input() gamesList: IGame[] = [];
    @Input() gameGroupsList: IGameGroup[];
    @Input() platformList: IPlatform[];
    @Input() accountsList: IGamingAccount[];

    public mapGameGroups: Map<string, IGameGroup>;
    public mapPlatforms: Map<EPlatform, IPlatform>;
    public mapAccounts: Map<string, IGamingAccount>;

    ngOnInit(): void {
        this._setParseGameGroups(this.gameGroupsList);
        this._setParsePlatformList(this.platformList);
        this._setParseAccounts(this.accountsList);
    }

    public trackByGame(index: number, game: IGame): string {
        return game.id;
    }

    private _setParseGameGroups(gameGroupsList: IGameGroup[]): void {
        this.mapGameGroups = new Map<string, IGameGroup>(
            gameGroupsList.map(ggItem => [ ggItem.id, ggItem ]),
        );
    }

    private _setParsePlatformList(platformList: IPlatform[]): void {
        this.mapPlatforms = new Map<EPlatform, IPlatform>(
            platformList.map(platformItem => [ platformItem.type, platformItem ]),
        );
    }

    private _setParseAccounts(accountsList: IGamingAccount[]): void {
        this.mapAccounts = new Map<string, IGamingAccount>(
            accountsList.map(accountItem => [ accountItem.id, accountItem ]),
        );
    }
}
