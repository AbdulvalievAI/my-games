import type { Observable } from "rxjs";

import type { IGame, IGameGroup } from "./games.interfaces";
import type { IPlatform } from "./platforms.interfaces";

export interface ISearchParam {
    field: keyof IGame;
    operator: string;
    value: string;
}

export interface IApiGames {
    createGame(game: IGame): Observable<IGame>;
    getGameById(id: string): Observable<IGame | undefined>;
    getGames(): Observable<IGame[]>;
    updateGame(game: IGame): Observable<IGame>;
    deleteGame(id: string): Observable<IServerMessage>;
    searchGames(params: ISearchParam[]): Observable<IGame[] | []>;
}

export interface IApiGameGroups {
    createGameGroup(gameGroup: IGameGroup): Observable<IGameGroup>;
    getGameGroupById(id: string): Observable<IGameGroup | undefined>;
    getGameGroups(): Observable<IGameGroup[]>;
    updateGameGroup(gameGroup: IGameGroup): Observable<IGameGroup>;
    deleteGameGroup(id: string): Observable<IServerMessage>;
}

export interface IApiPlatforms {
    getPlatforms(): Observable<IPlatform[]>;
}

export interface IServerMessage {
    status: string;
    message: string;
}