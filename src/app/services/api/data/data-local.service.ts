import { inject, Injectable } from "@angular/core";
import cloneDeep from "lodash-es/cloneDeep";
import type { Observable } from "rxjs";

import type { EPlatform } from "../../../data/platforms";
import type { IDataPointService, IServerMessage } from "../../../types/api.interfaces";
import type { IGame, IGameGroup } from "../../../types/games.interfaces";
import type { IPlatform } from "../../../types/platforms.interfaces";
import { type ISearchParam, ToolsService } from "../../tools.service";

@Injectable({
    providedIn: 'root'
})
export class DataLocalService implements IDataPointService {
    private readonly _toolsService = inject(ToolsService);

    private readonly _keyGame = 'games_list';
    private readonly _keyPlatforms = 'platforms_list';
    private readonly _keyGameGroups = 'game_groups_list';

    /* Game */

    public createGame(game: IGame): Observable<IGame> {
        return this._toolsService.serverDelay(() => {
            const gamesArr = this._getParseData<IGame>(this._keyGame);

            gamesArr.push(game);
            localStorage.setItem(this._keyGame, JSON.stringify(gamesArr));

            return cloneDeep(game);
        });
    }

    public getGameById(id: string): IGame | undefined {
        const gamesArr = this._getParseData<IGame>(this._keyGame);

        return gamesArr.find(gameItem => gameItem.id === id);
    }

    public getGames(): Observable<IGame[]> {
        return this._toolsService.serverDelay(() => {
            return this._getParseData<IGame>(this._keyGame);
        });
    }

    public updateGame(game: IGame): Observable<IGame> {
        return this._toolsService.serverDelay(() => {
            const gamesArr = this._getParseData<IGame>(this._keyGame);
            const findedGameIdx = gamesArr.findIndex(gameItem => gameItem.id === game.id);

            if (findedGameIdx === -1) {
                throw new Error(`Не найдена игра с id ${game.id}`);
            }

            gamesArr[findedGameIdx] = game;
            localStorage.setItem(this._keyGame, JSON.stringify(gamesArr));

            return cloneDeep(game);
        });
    }

    public deleteGame(id: string): Observable<IServerMessage> {
        return this._toolsService.serverDelay(() => {
            const gamesArr = this._getParseData<IGame>(this._keyGame);
            const findedGameIdx = gamesArr.findIndex(gameItem => gameItem.id === id);
            const successMsg = {
                "status": "success",
                "message": `Объект c id ${id} успешно удалён`
            };

            if (findedGameIdx === -1) {
                return successMsg;
            }

            gamesArr.splice(findedGameIdx, 1);
            localStorage.setItem(this._keyGame, JSON.stringify(gamesArr));

            return successMsg;
        });
    }

    public searchGames(params: ISearchParam<IGame>[]): IGame[] | [] {
        const gamesArr = this._getParseData<IGame>(this._keyGame);

        return this._toolsService.filterGames(gamesArr, params);
    }

    /* GameGroup */

    public createGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        return this._toolsService.serverDelay(() => {
            const gameGroupsArr = this._getParseData<IGameGroup>(this._keyGameGroups);

            gameGroupsArr.push(gameGroup);
            localStorage.setItem(this._keyGameGroups, JSON.stringify(gameGroupsArr));

            return cloneDeep(gameGroup);
        });
    }

    public getGameGroupById(id: string): IGameGroup | undefined {
        const gamesGroupsArr = this._getParseData<IGameGroup>(this._keyGameGroups);

        return gamesGroupsArr.find(gGroupItem => gGroupItem.id === id);
    }

    public getGameGroups(): Observable<IGameGroup[]> {
        return this._toolsService.serverDelay(() => {
            return this._getParseData<IGameGroup>(this._keyGameGroups);
        });
    }

    public updateGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        return this._toolsService.serverDelay(() => {
            const gamesGroupsArr = this._getParseData<IGameGroup>(this._keyGameGroups);
            const findedGameGroupsIdx = gamesGroupsArr.findIndex(gamesGroupItem => gamesGroupItem.id === gameGroup.id);

            if (findedGameGroupsIdx === -1) {
                throw new Error(`Не найдена игра с id ${gameGroup.id}`);
            }

            gamesGroupsArr[findedGameGroupsIdx] = gameGroup;
            localStorage.setItem(this._keyGameGroups, JSON.stringify(gamesGroupsArr));

            return cloneDeep(gameGroup);
        });
    }

    public deleteGameGroup(id: string): Observable<IServerMessage> {
        return this._toolsService.serverDelay(() => {
            const gamesGroupsArr = this._getParseData<IGameGroup>(this._keyGameGroups);
            const findedGamesGroupIdx = gamesGroupsArr.findIndex(gamesGroupItem => gamesGroupItem.id === id);
            const successMsg = {
                "status": "success",
                "message": `Объект c id ${id} успешно удалён`
            };

            if (findedGamesGroupIdx === -1) {
                return successMsg;
            }

            gamesGroupsArr.splice(findedGamesGroupIdx, 1);
            localStorage.setItem(this._keyGameGroups, JSON.stringify(gamesGroupsArr));

            return successMsg;
        });
    }

    /* Platforms */

    public getPlatforms(): Observable<IPlatform[]> {
        return this._toolsService.serverDelay(() => {
            return this._getParseData<IPlatform>(this._keyPlatforms);
        });
    }

    public getPlatformByType(type: EPlatform): IPlatform | undefined {
        const platformsArr = this._getParseData<IPlatform>(this._keyPlatforms);

        return platformsArr.find(platformItem => platformItem.type === type);
    }

    private _getParseData<T>(key: string): T[] {
        const value = localStorage.getItem(key);

        return (value ? JSON.parse(value) : []) as T[];
    }
}
