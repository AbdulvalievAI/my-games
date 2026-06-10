import { inject, Injectable } from "@angular/core";
import cloneDeep from "lodash-es/cloneDeep";
import type { Observable } from "rxjs";

import { gameGroups } from "../../../data/game-groups";
import { games } from "../../../data/games";
import { type EPlatform, platforms } from "../../../data/platforms";
import type {
    IDataPointService,
    IServerMessage,
} from "../../../types/api.interfaces";
import type { IGame, IGameGroup } from "../../../types/games.interfaces";
import type { IPlatform } from "../../../types/platforms.interfaces";
import { type ISearchParam, ToolsService } from "../../tools.service";

@Injectable({
    providedIn: 'root'
})
export class DataFakeApiService implements IDataPointService {
    public readonly _toolsService = inject(ToolsService);

    private _games = cloneDeep(games);
    private _gameGroups = cloneDeep(gameGroups);
    private readonly _platforms = cloneDeep(platforms);

    public createGame(game: IGame): Observable<IGame> {
        return this._toolsService.serverDelay(() => {
            this._games.push(game);

            return game;
        });
    }

    public getGameById(id: string): IGame | undefined {
        return cloneDeep(this._games.find(item => item.id === id));
    }

    public getGames(): Observable<IGame[]> {
        return this._toolsService.serverDelay(() => {
            return cloneDeep(this._games);
        });
    }

    public updateGame(game: IGame): Observable<IGame> {
        return this._toolsService.serverDelay(() => {
            const gamesList = this._games;
            const findedGameIdx = gamesList.findIndex(gameItem => gameItem.id === game.id);

            if (findedGameIdx !== -1) {
                gamesList[findedGameIdx] = game;

                this._games = gamesList;

                return gamesList[findedGameIdx];
            } else {
                throw new Error(`Не найдена игра с id ${game.id}`)
            }
        });
    }

    public deleteGame(id: string): Observable<IServerMessage> {
        return this._toolsService.serverDelay(() => {
            const gamesList = this._games;
            const gameIdx: number = ((): number => {
                let idx = -1;

                gamesList.find((item, i) => {
                    if (item.id === id) {
                        idx = i;

                        return true;
                    }

                    return false;
                });

                return idx;
            })();

            gamesList.splice(gameIdx, 1);

            this._games = gamesList;

            return {
                "status": "success",
                "message": `Объект c id ${id} успешно удалён`
            };
        });
    }

    public searchGames(params: ISearchParam<IGame>[]): IGame[] | [] {
        return this._toolsService.filterGames(this._games, params);
    }

    public createGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        return this._toolsService.serverDelay(() => {
            const gameGroupsList = this._gameGroups;

            gameGroupsList.push(gameGroup);

            this._gameGroups = gameGroupsList;

            return gameGroup;
        });
    }

    public getGameGroupById(id: string): IGameGroup | undefined {
        return cloneDeep(this._gameGroups.find(item => item.id === id));
    }

    public getGameGroups(): Observable<IGameGroup[]> {
        return this._toolsService.serverDelay(() => {
            return cloneDeep(this._gameGroups);
        });
    }

    public updateGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        return this._toolsService.serverDelay(() => {
            const gameGroupsList = this._gameGroups;
            const findedGroup: IGameGroup | undefined = gameGroupsList.find(gameGroupItem => gameGroupItem.id === gameGroup.id);

            if (findedGroup) {
                const updatedGameGroup = Object.assign(findedGroup, gameGroup);

                this._gameGroups = gameGroupsList;

                return updatedGameGroup;

            } else {
                throw new Error(`Не найдена группа с id ${gameGroup.id}`);
            }
        });
    }

    public deleteGameGroup(id: string): Observable<IServerMessage> {
        return this._toolsService.serverDelay(() => {
            const gameGroupsList = this._gameGroups;
            const gameGroupIdx = gameGroupsList.findIndex(item => (item.id === id));

            gameGroupsList.splice(gameGroupIdx, 1);

            this._gameGroups = gameGroupsList;

            return {
                "status": "success",
                "message": `Объект c id ${id} успешно удалён`
            };
        });
    }

    public getPlatforms(): Observable<IPlatform[]> {
        return this._toolsService.serverDelay(() => {
            return this._platforms;
        });
    }

    public getPlatformByType(type: EPlatform): IPlatform | undefined {
        return this._platforms.find(platformItem => platformItem.type === type);
    }
}
