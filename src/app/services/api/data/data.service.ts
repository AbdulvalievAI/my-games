import { inject, Injectable } from "@angular/core";
import {  type Observable, } from "rxjs";

import type { EPlatform } from "../../../data/platforms";
import type { IDataPointService, IServerMessage } from "../../../types/api.interfaces";
import type { IGame, IGameGroup } from "../../../types/games.interfaces";
import type { IGamingAccount } from "../../../types/gaming-accounts.interfaces";
import type { IPlatform } from "../../../types/platforms.interfaces";
import { type ISearchParam,ToolsService } from "../../tools.service";
import { AuthService } from "../auth.service";
import { DataCloudService } from "./data-cloud.service";
/* import { DataFakeApiService } from "./data-fake.service"; */
import { DataLocalService } from "./data-local.service";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private readonly _authService = inject(AuthService);
    private readonly _dataCloudService = inject(DataCloudService);
    private readonly _dataLocalService = inject(DataLocalService);
    /* private readonly _dataFakeApiService = inject(DataFakeApiService); */
    private readonly _toolsService = inject(ToolsService);

    private get _pointService(): IDataPointService {
/*         if (this._authService.useFake) {
            return this._dataFakeApiService;
        } */

        if (this._authService.isAuthorized()) {
            return this._dataCloudService;
        } else {
            return this._dataLocalService;
        }
    }

    public syncData(): Observable<boolean> {
        if (this._pointService.initData) {
            return this._pointService.initData();
        } else {
            return this._toolsService.serverDelay(() => {
                return true
            }, 1);
        }
    }

    /* Game */

    public createGame(game: IGame): Observable<IGame> {
        return this._pointService.createGame(game);
    }

    public getGameById(id: string): IGame | undefined {
        return this._pointService.getGameById(id);
    }

    public getGames(): Observable<IGame[]> {
        return this._pointService.getGames();
    }

    public updateGame(game: IGame): Observable<IGame> {
        return this._pointService.updateGame(game);
    }

    public updateGames(games: IGame[]): Observable<IGame[]> {
        return this._pointService.updateGames(games);
    }

    public deleteGame(id: string): Observable<IServerMessage> {
        return this._pointService.deleteGame(id);
    }

    public searchGames(params: ISearchParam<IGame>[]): IGame[] | [] {
        return this._pointService.searchGames(params);
    }

    /* Games Groups */

    public createGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        return this._pointService.createGameGroup(gameGroup);
    }

    public getGameGroupById(id: string): IGameGroup | undefined {
        return this._pointService.getGameGroupById(id);
    }

    public getGameGroups(): Observable<IGameGroup[]> {
        return this._pointService.getGameGroups();
    }

    public updateGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        return this._pointService.updateGameGroup(gameGroup);
    }

    public deleteGameGroup(id: string): Observable<IServerMessage> {
        return this._pointService.deleteGameGroup(id)
    }

    /* Platforms */

    public getPlatforms(): Observable<IPlatform[]> {
        return this._pointService.getPlatforms();
    }

    public getPlatformByType(type: EPlatform): IPlatform | undefined {
        return this._pointService.getPlatformByType(type);
    }

    /* Gaming Accounts */

    public createGamingAccount(gamingAccount: IGamingAccount): Observable<IGamingAccount> {
        return this._pointService.createGamingAccount(gamingAccount);
    }

    public getGamingAccountById(id: string): IGamingAccount | undefined {
        return this._pointService.getGamingAccountById(id);
    }

    public getGamingAccounts(): Observable<IGamingAccount[]> {
        return this._pointService.getGamingAccounts();
    }

    public updateGamingAccount(gamingAccount: IGamingAccount): Observable<IGamingAccount> {
        return this._pointService.updateGamingAccount(gamingAccount);
    }

    public deleteGamingAccount(id: string): Observable<IServerMessage> {
        return this._pointService.deleteGamingAccount(id);
    }
}
