import { inject, Injectable } from "@angular/core";
import cloneDeep from "lodash-es/cloneDeep";
import type { Observable } from "rxjs";

import { type EPlatform,platforms } from "../../../data/platforms";
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
            const gamesList = this._getParseData<IGame>(this._keyGame);

            gamesList.push(game);
            localStorage.setItem(this._keyGame, JSON.stringify(gamesList));

            return cloneDeep(game);
        });
    }

    public getGameById(id: string): IGame | undefined {
        const gamesList = this._getParseData<IGame>(this._keyGame);

        return gamesList.find(gameItem => gameItem.id === id);
    }

    public getGames(): Observable<IGame[]> {
        return this._toolsService.serverDelay(() => {
            return this._getParseData<IGame>(this._keyGame);
        });
    }

    public updateGame(game: IGame): Observable<IGame> {
        return this._toolsService.serverDelay(() => {
            const gamesList = this._getParseData<IGame>(this._keyGame);
            const findedGameIdx = gamesList.findIndex(gameItem => gameItem.id === game.id);

            if (findedGameIdx === -1) {
                throw new Error(`Не найдена игра с id ${game.id}`);
            }

            gamesList[findedGameIdx] = game;
            localStorage.setItem(this._keyGame, JSON.stringify(gamesList));

            return cloneDeep(game);
        });
    }

    public updateGames(games: IGame[]): Observable<IGame[]> {
        return this._toolsService.serverDelay(() => {
            const gamesList = this._getParseData<IGame>(this._keyGame);

            games.forEach(gameItem => {
                const findedGameIdx = gamesList.findIndex(gameItem => gameItem.id === gameItem.id);

                if (findedGameIdx === -1) {
                    throw new Error(`Не найдена игра с id ${gameItem.id}`);
                }

                gamesList[findedGameIdx] = gameItem;
            });

            localStorage.setItem(this._keyGame, JSON.stringify(gamesList));

            return cloneDeep(gamesList);
        });
    }

    public deleteGame(id: string): Observable<IServerMessage> {
        return this._toolsService.serverDelay(() => {
            const gamesList = this._getParseData<IGame>(this._keyGame);
            const findedGameIdx = gamesList.findIndex(gameItem => gameItem.id === id);
            const successMsg = {
                "status": "success",
                "message": `Объект c id ${id} успешно удалён`
            };

            if (findedGameIdx === -1) {
                return successMsg;
            }

            gamesList.splice(findedGameIdx, 1);
            localStorage.setItem(this._keyGame, JSON.stringify(gamesList));

            return successMsg;
        });
    }

    public searchGames(params: ISearchParam<IGame>[]): IGame[] | [] {
        const gamesList = this._getParseData<IGame>(this._keyGame);

        return this._toolsService.filterGames(gamesList, params);
    }

    public setGames(games: IGame[]): void {
        localStorage.setItem(this._keyGame, JSON.stringify(games));
    }

    /* GameGroup */

    public createGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        return this._toolsService.serverDelay(() => {
            const gamesGroupsList = this._getParseData<IGameGroup>(this._keyGameGroups);

            gamesGroupsList.push(gameGroup);
            localStorage.setItem(this._keyGameGroups, JSON.stringify(gamesGroupsList));

            return cloneDeep(gameGroup);
        });
    }

    public getGameGroupById(id: string): IGameGroup | undefined {
        const gamesGroupsList = this._getParseData<IGameGroup>(this._keyGameGroups);

        return gamesGroupsList.find(gGroupItem => gGroupItem.id === id);
    }

    public getGameGroups(): Observable<IGameGroup[]> {
        return this._toolsService.serverDelay(() => {
            return this._getParseData<IGameGroup>(this._keyGameGroups);
        });
    }

    public updateGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        return this._toolsService.serverDelay(() => {
            const gamesGroupsList = this._getParseData<IGameGroup>(this._keyGameGroups);
            const findedGameGroupsIdx = gamesGroupsList.findIndex(gamesGroupItem => gamesGroupItem.id === gameGroup.id);

            if (findedGameGroupsIdx === -1) {
                throw new Error(`Не найдена игра с id ${gameGroup.id}`);
            }

            gamesGroupsList[findedGameGroupsIdx] = gameGroup;
            localStorage.setItem(this._keyGameGroups, JSON.stringify(gamesGroupsList));

            return cloneDeep(gameGroup);
        });
    }

    public deleteGameGroup(id: string): Observable<IServerMessage> {
        return this._toolsService.serverDelay(() => {
            const gamesGroupsList = this._getParseData<IGameGroup>(this._keyGameGroups);
            const findedGamesGroupIdx = gamesGroupsList.findIndex(gamesGroupItem => gamesGroupItem.id === id);
            const successMsg = {
                "status": "success",
                "message": `Объект c id ${id} успешно удалён`
            };

            if (findedGamesGroupIdx === -1) {
                return successMsg;
            }

            gamesGroupsList.splice(findedGamesGroupIdx, 1);
            localStorage.setItem(this._keyGameGroups, JSON.stringify(gamesGroupsList));

            return successMsg;
        });
    }

    public setGameGroups(gameGroups: IGameGroup[]): void {
        localStorage.setItem(this._keyGameGroups, JSON.stringify(gameGroups));
    }

    /* Platforms */

    public getPlatforms(): Observable<IPlatform[]> {
        return this._toolsService.serverDelay(() => {
            return cloneDeep(this._getDataPlatforms());
        });
    }

    public getPlatformByType(type: EPlatform): IPlatform | undefined {
        const platformsList = this._getDataPlatforms();

        return platformsList.find(platformItem => platformItem.type === type);
    }

    public existLocalData(): boolean {
        const gamesList = this._getParseData<IGame>(this._keyGame);
        const gamesGroupsList = this._getParseData<IGameGroup>(this._keyGameGroups);
        const platformsList = this._getParseData(this._keyPlatforms);

        return Boolean(gamesList.length || gamesGroupsList.length || platformsList.length);
    }

    public cleanGames() {
        localStorage.removeItem(this._keyGame);
    }

    public cleanGameGroups() {
        localStorage.removeItem(this._keyGameGroups);
    }

    private _getDataPlatforms(isMock = true): IPlatform[] {
        if (isMock) {
            return cloneDeep(platforms);
        } else {
            return this._getParseData<IPlatform>(this._keyPlatforms)
        }
    }

    private _getParseData<T>(key: string): T[] {
        const value = localStorage.getItem(key);

        return (value ? JSON.parse(value) : []) as T[];
    }
}
