import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import type {
    IApiGameGroups,
    IApiGames,
    IApiPlatforms,
    ISearchParam,
    IServerMessage,
} from "../../types/api.interfaces";
import type { IGame, IGameGroup } from "../../types/games.interfaces";
import type { IPlatform } from "../../types/platforms.interfaces";
import { DataService } from "../data/data.service";

@Injectable({
    providedIn: 'root'
})
export class FakeGamesApiService implements IApiGames, IApiGameGroups, IApiPlatforms {
    public readonly _dataService = inject(DataService);

    public createGame(game: IGame): Observable<IGame> {
        return this._serverDelay(() => {
            const gamesList = this._dataService.games;

            this._dataService.games = gamesList;

            return game;
        });
    }

    public getGameById(id: string): Observable<IGame | undefined> {
        return this._serverDelay(() => {
            return this._dataService.games.find(item => item.id === id);
        });
    }

    public getGames(): Observable<IGame[]> {
        return this._serverDelay(() => {
            return this._dataService.games;;
        });
    }

    public updateGame(game: IGame): Observable<IGame> {
        return this._serverDelay(() => {
            const gamesList = this._dataService.games;
            const findedGameIdx = gamesList.findIndex(gameItem => gameItem.id === game.id);

            if (findedGameIdx !== -1) {
                gamesList[findedGameIdx] = game;

                this._dataService.games = gamesList;

                return gamesList[findedGameIdx];
            } else {
                throw new Error(`Не найдена игра с id ${game.id}`)
            }
        });
    }

    public deleteGame(id: string): Observable<IServerMessage> {
        return this._serverDelay(() => {
            const gamesList = this._dataService.games;
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

            this._dataService.games = gamesList;

            return {
                "status": "success",
                "message": `Объект c id ${id} успешно удалён`
            };
        });
    }

    public searchGames(params: ISearchParam[]): Observable<IGame[] | []> {
        return this._serverDelay(() => {
            return this._filterGames(params);
        });
    }

    public createGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        return this._serverDelay(() => {
            const gameGroupsList = this._dataService.gameGroups;

            gameGroupsList.push(gameGroup);

            this._dataService.gameGroups = gameGroupsList;

            return gameGroup;
        });
    }

    public getGameGroupById(id: string): Observable<IGameGroup | undefined> {
        return this._serverDelay(() => {
            return this._dataService.gameGroups.find(item => item.id === id);
        });
    }

    public getGameGroups(): Observable<IGameGroup[]> {
        return this._serverDelay(() => {
            return this._dataService.gameGroups;
        });
    }

    public updateGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        return this._serverDelay(() => {
            const gameGroupsList = this._dataService.gameGroups;
            const findedGroup: IGameGroup | undefined = gameGroupsList.find(gameGroupItem => gameGroupItem.id === gameGroup.id);

            if (findedGroup) {
                const updatedGameGroup = Object.assign(findedGroup, gameGroup);

                this._dataService.gameGroups = gameGroupsList;

                return updatedGameGroup;

            } else {
                throw new Error(`Не найдена группа с id ${gameGroup.id}`);
            }
        });
    }

    public deleteGameGroup(id: string): Observable<IServerMessage> {
        return this._serverDelay(() => {
            const gameGroupsList = this._dataService.gameGroups;
            const gamesList = this._dataService.games;
            const games: IGame[] = gamesList.filter(gameItem => {
                if (!gameItem.groups?.length) {
                    return false;
                }

                return gameItem.groups.includes(id);
            });

            if (games.length) {
                games.forEach(gameItem => {
                    if (gameItem.groups?.length === 1) {
                        delete gameItem.groups;
                    } else {
                        const gameGroupIdx = gameGroupsList.findIndex(item => (gameItem.groups?.includes(item.id)));

                        gameItem.groups?.splice(gameGroupIdx, 1);
                    }
                });
            }

            const gameGroupIdx = gameGroupsList.findIndex(item => (item.id === id));

            gameGroupsList.splice(gameGroupIdx, 1);

            this._dataService.gameGroups = gameGroupsList;
            this._dataService.games = gamesList;

            return {
                "status": "success",
                "message": `Объект c id ${id} успешно удалён`
            };
        });
    }

    public getPlatforms(): Observable<IPlatform[]> {
        return this._serverDelay(() => {
            return this._dataService.platforms;
        });
    }

    private _filterGames(params: ISearchParam[]): IGame[] | [] {
        const gamesList = this._dataService.games;

        return gamesList.filter(gameItem => {
            const filterResults = params.filter(paramItem => {
                if (!Object.hasOwn(gameItem, paramItem.field)) {
                    return false;
                }

                switch (paramItem.operator) {
                    case 'like': {
                        const targetValue = paramItem.value;
                        const gameValue = gameItem[paramItem.field] as string;

                        const isValidTypes = typeof gameValue === 'string' && typeof targetValue === 'string'

                        if (isValidTypes) {
                            return gameValue.toLocaleLowerCase().includes(targetValue.toLocaleLowerCase());
                        } else {
                            throw new Error('Operator "like" error: invalid types')
                        }
                    }
                    case 'eq': {
                        const targetValue = paramItem.value;
                        const gameValue = gameItem[paramItem.field];

                        if (typeof targetValue === 'string' && Array.isArray(gameValue)) {
                            return (gameValue as string[]).includes(targetValue);
                        } else {
                            throw new Error('Operator "eq" error: invalid types')
                        }
                    }
                }

                return false;
            });

            return params.length && filterResults.length == params.length;
        });
    }

    private _serverDelay<T>(callback: () => T): Observable<T> {
        return new Observable<T>(subscriber => {
            const timer = setTimeout(() => {
                try {
                    const callbackData = callback();

                    subscriber.next(callbackData);
                    subscriber.complete();
                } catch (error) {
                    subscriber.error(error);
                }
            }, 1500);

            return () => clearTimeout(timer);
        });
    }
}
