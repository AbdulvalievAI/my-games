import { Injectable } from "@angular/core";
import cloneDeep from 'lodash-es/cloneDeep';
import { Observable } from "rxjs";

import type {
    IApiGameGroups,
    IApiGames,
    ISearchParam,
} from "../types/api-games.interfaces";
import type { IGame, IGameGroup } from "../types/games.interfaces";
import { gameGroups, gamesList } from './../data/mocks';

export interface IServerMessage {
    status: string;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class FakeGamesApiService implements IApiGames, IApiGameGroups {
    private readonly _gamesList = cloneDeep(gamesList);
    private readonly _gameGroups = cloneDeep(gameGroups);

    public createGame(game: IGame): Observable<IGame> {
        return this._serverDelay(() => {
            this._gamesList.push(game);

            return game;
        });
    }

    public getGameById(id: string): Observable<IGame | undefined> {
        return this._serverDelay(() => {
            return this._gamesList.find(item => item.id === id);
        });
    }

    public getGames(): Observable<IGame[]> {
        return this._serverDelay(() => {
            return cloneDeep(this._gamesList);
        });
    }

    public updateGame(game: IGame): Observable<IGame> {
        return this._serverDelay(() => {
            const findedGameIdx = this._gamesList.findIndex(gameItem => gameItem.id === game.id);

            if (findedGameIdx !== -1) {
                this._gamesList[findedGameIdx] = game;

                return this._gamesList[findedGameIdx];
            } else {
                throw new Error(`Не найдена игра с id ${game.id}`)
            }
        });
    }

    public deleteGame(id: string): Observable<IServerMessage> {
        return this._serverDelay(() => {
            const gameIdx: number = ((): number => {
                let idx = -1;

                this._gamesList.find((item, i) => {
                    if (item.id === id) {
                        idx = i;

                        return true;
                    }

                    return false;
                });

                return idx;
            })();

            this._gamesList.splice(gameIdx, 1);

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
            this._gameGroups.push(gameGroup);

            return gameGroup;
        });
    }

    public getGameGroupById(id: string): Observable<IGameGroup | undefined> {
        return this._serverDelay(() => {
            return this._gameGroups.find(item => item.id === id);
        });
    }

    public getGameGroups(): Observable<IGameGroup[]> {
        return this._serverDelay(() => {
            return cloneDeep(this._gameGroups);
        });
    }

    public updateGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        return this._serverDelay(() => {
            const findedGroup: IGameGroup | undefined = this._gameGroups.find(gameGroupItem => gameGroupItem.id === gameGroup.id);

            if (findedGroup) {
                return Object.assign(findedGroup, gameGroup);
            } else {
                throw new Error(`Не найдена группа с id ${gameGroup.id}`);
            }
        });
    }

    public deleteGameGroup(id: string): Observable<IServerMessage> {
        return this._serverDelay(() => {
            const games: IGame[] = this._gamesList.filter(gameItem => {
                if (!gameItem.groups?.length) {
                    return false;
                }

                return gameItem.groups.includes(id);
            });

            if(games.length) {
                games.forEach(gameItem => {
                    if(gameItem.groups?.length === 1) {
                        delete gameItem.groups;
                    } else {
                        const gameGroupIdx = this._gameGroups.findIndex(item => (gameItem.groups?.includes(item.id)));

                        gameItem.groups?.splice(gameGroupIdx, 1);
                    }
                });
            }

            const gameGroupIdx = this._gameGroups.findIndex(item => (item.id === id));

            this._gameGroups.splice(gameGroupIdx, 1);

            return {
                "status": "success",
                "message": `Объект c id ${id} успешно удалён`
            };
        });
    }

    private _filterGames(params: ISearchParam[]): IGame[] | [] {
        return this._gamesList.filter(gameItem => {
            const filterResults = params.filter(paramItem => {
                if (!Object.hasOwn(gameItem, paramItem.field)) {
                    return false;
                }

                switch(paramItem.operator) {
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
