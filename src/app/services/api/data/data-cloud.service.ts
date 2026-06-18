import { inject, Injectable } from "@angular/core";
import { forkJoin, map, type Observable } from "rxjs";

import { EYdxFileNames } from '../../../config/yandex.config';
import { type EPlatform,platforms } from "../../../data/platforms";
import type { IDataPointService, IServerMessage } from "../../../types/api.interfaces";
import type { IGame, IGameGroup } from "../../../types/games.interfaces";
import type { IGamingAccount } from "../../../types/gaming-accounts.interfaces";
import type { IPlatform } from "../../../types/platforms.interfaces";
import { FileService } from "../../file.service";
import { type ISearchParam,ToolsService } from "../../tools.service";
import { YdxDiskService } from "../yandex-disk.service";

@Injectable({
    providedIn: 'root'
})
export class DataCloudService implements IDataPointService {
    private readonly _diskService = inject(YdxDiskService);
    private readonly _fileService = inject(FileService);
    private readonly _toolsService = inject(ToolsService);

    private _gamesMap: Map<string, IGame>
    private _gameGroupMap: Map<string, IGameGroup>;
    private _platformsMap: Map<string, IPlatform>;
    private _gamingAccountsMap: Map<string, IGamingAccount>;

    public initData(): Observable<boolean> {
        return forkJoin([
            this._diskService.downloadFile<IGame>(EYdxFileNames.GAMES),
            this._diskService.downloadFile<IGameGroup>(EYdxFileNames.GAMES_GROUPS),
            this._diskService.downloadFile<IGamingAccount>(EYdxFileNames.GAMING_ACCOUNTS),
            /* this._diskService.downloadFile<IPlatform>(EYdxFileNames.PLATFORMS), */
        ])
        .pipe(map(([ games, gameGroups, gamingAccounts/* , platforms */ ]) => {
            this._setMapGames(games?.jsonData || []);
            this._setMapGameGroups(gameGroups?.jsonData || []);
            this._setMapGamingAccounts(gamingAccounts?.jsonData || []);
            this._setMapPlatforms(platforms);

            /* if (platforms.status) {
                this._setMapPlatforms(platforms);
            } */

            return true;
        }));
    }

    /* Games */

    public createGame(game: IGame): Observable<IGame> {
        const gamesList = this._getMapGames();

        gamesList.push(game);

        const file = this._fileService.generateFile(gamesList);

        return this._diskService.uploadFile(file, EYdxFileNames.GAMES)
            .pipe(map(() => {
                this._setMapGame(game);

                return game;
            }));
    }

    public getGameById(id: string): IGame | undefined {
        const gamesList = this._getMapGames();

        return gamesList.find(gameItem => gameItem.id === id);
    }

    public getGames(): Observable<IGame[]> {
        return this._toolsService.serverDelay(() => {
            return this._getMapGames();
        }, 1);
    }

    public updateGame(game: IGame): Observable<IGame> {
        const gamesList = this._getMapGames();
        const gameIdx =  gamesList.findIndex(gameItem => gameItem.id === game.id);

        gamesList[gameIdx] = game;

        const file = this._fileService.generateFile(gamesList);

        return this._diskService.uploadFile(file, EYdxFileNames.GAMES)
            .pipe(map(() => {
                this._setMapGame(game);

                return game;
            }));
    }

    public updateGames(games: IGame[]): Observable<IGame[]> {
        const gamesList = this._getMapGames();

        games.forEach(newGameItem => {
            const gameIdx =  gamesList.findIndex(gameItem => gameItem.id === newGameItem.id);

            gamesList[gameIdx] = newGameItem;
        });

        const file = this._fileService.generateFile(gamesList);

        return this._diskService.uploadFile(file, EYdxFileNames.GAMES)
            .pipe(map(() => {
                games.forEach(gameItem => {
                    this._setMapGame(gameItem);
                });

                return gamesList;
            }));
    }

    public deleteGame(id: string): Observable<IServerMessage> {
        const gamesList = this._getMapGames();
        const gameIdx =  gamesList.findIndex(gameItem => gameItem.id === id);
        const successMsg = {
            "status": "success",
            "message": `Объект c id ${id} успешно удалён`
        };

        gamesList.splice(gameIdx, 1);

        const file = this._fileService.generateFile(gamesList);

        return this._diskService.uploadFile(file, EYdxFileNames.GAMES)
            .pipe(map(() => {
                this._gamesMap.delete(id);

                return successMsg;
            }));
    }

    public searchGames(params: ISearchParam<IGame>[]): IGame[] | [] {
        const gamesList = this._getMapGames();

        return this._toolsService.filterGames(gamesList, params);
    }

    /* Games Groups */

    public createGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        const gameGroupsList = this._getMapGameGroups();

        gameGroupsList.push(gameGroup);

        const file = this._fileService.generateFile(gameGroupsList);

        return this._diskService.uploadFile(file, EYdxFileNames.GAMES_GROUPS)
            .pipe(map(() => {
                this._setMapGameGroup(gameGroup);

                return gameGroup;
            }));
    }

    public getGameGroupById(id: string): IGameGroup | undefined {
        const gameGroupsList = this._getMapGameGroups();

        return gameGroupsList.find(gameGroupItem => gameGroupItem.id === id);
    }

    public getGameGroups(): Observable<IGameGroup[]> {
        return this._toolsService.serverDelay(() => {
            return this._getMapGameGroups();
        }, 1);
    }

    public updateGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        const gameGroupsList = this._getMapGameGroups();
        const gameGroupIdx =  gameGroupsList.findIndex(gameGroupItem => gameGroupItem.id === gameGroup.id);

        gameGroupsList[gameGroupIdx] = gameGroup;

        const file = this._fileService.generateFile(gameGroupsList);

        return this._diskService.uploadFile(file, EYdxFileNames.GAMES_GROUPS)
            .pipe(map(() => {
                this._setMapGameGroup(gameGroup);

                return gameGroup;
            }));
    }

    public deleteGameGroup(id: string): Observable<IServerMessage> {
        const gameGroupsList = this._getMapGameGroups();
        const gameGroupIdx =  gameGroupsList.findIndex(gameGroupItem => gameGroupItem.id === id);
        const successMsg = {
            "status": "success",
            "message": `Объект c id ${id} успешно удалён`
        };

        gameGroupsList.splice(gameGroupIdx, 1);

        const file = this._fileService.generateFile(gameGroupsList);

        return this._diskService.uploadFile(file, EYdxFileNames.GAMES_GROUPS)
            .pipe(map(() => {
                this._gameGroupMap.delete(id);

                return successMsg;
            }));
    }

    public getPlatformByType(type: EPlatform | undefined): IPlatform | undefined {
        const platformsList = this._getMapPlatforms();

        return platformsList.find(platformItem => platformItem.type === type);
    }

    /* Platforms */

    public getPlatforms(): Observable<IPlatform[]> {
        return this._toolsService.serverDelay(() => {
            return this._getMapPlatforms();
        }, 1);
    }

    /* Gaming Accounts */

    public createGamingAccount(gamingAccount: IGamingAccount): Observable<IGamingAccount> {
        const gamingAccountsList = this._getMapGamingAccounts();

        gamingAccountsList.push(gamingAccount);

        const file = this._fileService.generateFile(gamingAccountsList);

        return this._diskService.uploadFile(file, EYdxFileNames.GAMING_ACCOUNTS)
            .pipe(map(() => {
                this._setMapGamingAccount(gamingAccount);

                return gamingAccount;
            }));
    }

    public getGamingAccountById(id: string): IGamingAccount | undefined {
        const gamingAccountsList = this._getMapGamingAccounts();

        return gamingAccountsList.find(gAccount => gAccount.id === id);
    }

    public getGamingAccounts(): Observable<IGamingAccount[]> {
        return this._toolsService.serverDelay(() => {
            return this._getMapGamingAccounts();
        }, 1);
    }

    public updateGamingAccount(gamingAccount: IGamingAccount): Observable<IGamingAccount> {
        const gamingAccountsList = this._getMapGamingAccounts();
        const accountIdx =  gamingAccountsList.findIndex(gAccount => gAccount.id === gamingAccount.id);

        gamingAccountsList[accountIdx] = gamingAccount;

        const file = this._fileService.generateFile(gamingAccountsList);

        return this._diskService.uploadFile(file, EYdxFileNames.GAMING_ACCOUNTS)
            .pipe(map(() => {
                this._setMapGamingAccount(gamingAccount);

                return gamingAccount;
            }));
    }

    public deleteGamingAccount(id: string): Observable<IServerMessage> {
        const gamingAccountsList = this._getMapGamingAccounts();
        const accountIdx =  gamingAccountsList.findIndex(gAccount => gAccount.id === id);
        const successMsg = {
            "status": "success",
            "message": `Объект c id ${id} успешно удалён`
        };

        gamingAccountsList.splice(accountIdx, 1);

        const file = this._fileService.generateFile(gamingAccountsList);

        return this._diskService.uploadFile(file, EYdxFileNames.GAMING_ACCOUNTS)
            .pipe(map(() => {
                this._gamingAccountsMap.delete(id);

                return successMsg;
            }));
    }

    /* Maps */

    /* Map Games */

    private _setMapGames(games: IGame[]): void {
        this._gamesMap = new Map(
            games.map(game => [ game.id, game ])
        );
    }

    private _setMapGame(game: IGame): void {
        this._gamesMap.set(game.id, game);
    }

    private _getMapGames(): IGame[] {
        return this._gamesMap && [ ...this._gamesMap.values() ] || [];
    }

    /* Map Game Groups */

    private _setMapGameGroups(gameGroups: IGameGroup[]): void {
        this._gameGroupMap = new Map(
            gameGroups.map(gameGroup => [ gameGroup.id, gameGroup ])
        );
    }

    private _setMapGameGroup(gameGroup: IGameGroup): void {
        this._gameGroupMap.set(gameGroup.id, gameGroup);
    }

    private _getMapGameGroups(): IGameGroup[] {
        return this._gameGroupMap && [ ...this._gameGroupMap.values() ] || [];
    }

    /* Map Platforms */

    private _setMapPlatforms(platforms: IPlatform[]): void {
        this._platformsMap = new Map(
            platforms.map(platform => [ platform.type, platform ])
        );
    }

    private _getMapPlatforms(): IPlatform[] {
        return [ ...this._platformsMap.values() ];
    }

    /* Map Gaming Accounts */

    private _setMapGamingAccounts(gamingAccounts: IGamingAccount[]): void {
        this._gamingAccountsMap = new Map(
            gamingAccounts.map(gAccount => [ gAccount.id, gAccount ])
        );
    }

    private _setMapGamingAccount(gamingAccount: IGamingAccount): void {
        this._gamingAccountsMap.set(gamingAccount.id, gamingAccount);
    }

    private _getMapGamingAccounts(): IGamingAccount[] {
        return this._gamingAccountsMap && [ ...this._gamingAccountsMap.values() ] || [];
    }
}
