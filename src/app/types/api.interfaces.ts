import type { Observable } from "rxjs";

import type { EPlatform } from "../data/platforms";
import type { ISearchParam } from "../services/tools.service";
import type { IGame, IGameGroup } from "./games.interfaces";
import type { IPlatform } from "./platforms.interfaces";

export interface IApiGames {
    /** Создать игру */
    createGame(game: IGame): Observable<IGame>;
    /** Получить игру по ID */
    getGameById(id: string): IGame | undefined;
    /** Получить весь список игр */
    getGames(): Observable<IGame[]>;
    /** Обновить данные игры */
    updateGame(game: IGame): Observable<IGame>;
    /** Удалить игру */
    deleteGame(id: string): Observable<IServerMessage>;
    /** Поиск игры по параметрам */
    searchGames(params: ISearchParam<IGame>[]): IGame[] | [];
}

export interface IApiGameGroups {
    /** Создать группу игр */
    createGameGroup(gameGroup: IGameGroup): Observable<IGameGroup>;
    /** Получить группу игр по ID */
    getGameGroupById(id: string): IGameGroup | undefined;
    /** Получить весь список групп игр */
    getGameGroups(): Observable<IGameGroup[]>;
    /** Обновить данные группы игр */
    updateGameGroup(gameGroup: IGameGroup): Observable<IGameGroup>;
    /** Удалить группу игр */
    deleteGameGroup(id: string): Observable<IServerMessage>;
}

export interface IApiPlatforms {
    /** Получить список весь игровых платформ */
    getPlatforms(): Observable<IPlatform[]>;
    getPlatformByType(type: EPlatform): IPlatform | undefined;
}

export interface IServerMessage {
    status: string;
    message: string;
}

export interface IDataPointService extends IApiGames, IApiGameGroups, IApiPlatforms {
    initData?(): Observable<boolean>;
}
