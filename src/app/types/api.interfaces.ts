import type { Observable } from "rxjs";

import type { EPlatform } from "../data/platforms";
import type { ISearchParam } from "../services/tools.service";
import type { IGame, IGameGroup } from "./games.interfaces";
import type { IGamingAccount } from "./gaming-accounts.interfaces";
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
    /** Обновить данные нескольких игр сразу */
    updateGames(games: IGame[]): Observable<IGame[]>;
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
    getPlatformByType(type: EPlatform | undefined): IPlatform | undefined;
}

export interface IApiGamingAccounts {
    /** Создать игровой аккаунт */
    createGamingAccount(gamingAccount: IGamingAccount): Observable<IGamingAccount>;
    /** Получить игровой аккаунт по ID */
    getGamingAccountById(id: string): IGamingAccount | undefined;
    /** Получить весь игровых аккаунтов */
    getGamingAccounts(): Observable<IGamingAccount[]>;
    /** Обновить данные игрового аккаунта */
    updateGamingAccount(gamingAccount: IGamingAccount): Observable<IGamingAccount>;
    /** Удалить игровой аккаунт */
    deleteGamingAccount(id: string): Observable<IServerMessage>;
}

export interface IServerMessage {
    status: string;
    message: string;
}

export interface IDataPointService extends IApiGames, IApiGameGroups, IApiPlatforms, IApiGamingAccounts {
    initData?(): Observable<boolean>;
}

export interface IResDownloadFile<T> {
    status: boolean;
    jsonData: T[];
}
