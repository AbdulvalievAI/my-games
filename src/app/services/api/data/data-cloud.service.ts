import { inject, Injectable } from "@angular/core";
import { forkJoin, map, type Observable } from "rxjs";

import { type EPlatform,platforms } from "../../../data/platforms";
import type { IDataPointService, IServerMessage } from "../../../types/api.interfaces";
import type { IGame, IGameGroup } from "../../../types/games.interfaces";
import type { IPlatform } from "../../../types/platforms.interfaces";
import { FileService } from "../../file.service";
import { type ISearchParam,ToolsService } from "../../tools.service";
import { EPathFiles, YdxDiskService } from "../yandex-disk.service";

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

    public initData(): Observable<boolean> {
        return forkJoin([
            this._diskService.downloadFile<IGame>(EPathFiles.GAMES),
            this._diskService.downloadFile<IGameGroup>(EPathFiles.GAMES_GROUPS),
            /* this._diskService.downloadFile<IPlatform>(EPathFiles.PLATFORMS), */
        ])
        .pipe(map(([ games, gameGroups/* , platforms */ ]) => {
            if (games.status) {
                this._setMapGames(games.jsonData);
            }

            if (gameGroups.status) {
                this._setMapGameGroups(gameGroups.jsonData);
            }

            this._setMapPlatforms(platforms);

            /* if (platforms.status) {
                this._setMapPlatforms(platforms);
            } */

            return true;
        }));
    }

    // Game

    public createGame(game: IGame): Observable<IGame> {
        const gamesList = this._getMapGames();

        gamesList.push(game);

        const file = this._fileService.generateFile(gamesList);

        return this._diskService.uploadFile(file, EPathFiles.GAMES)
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

        return this._diskService.uploadFile(file, EPathFiles.GAMES)
            .pipe(map(() => {
                this._setMapGame(game);

                return game;
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

        return this._diskService.uploadFile(file, EPathFiles.GAMES)
            .pipe(map(() => {
                this._gamesMap.delete(id);

                return successMsg;
            }));
    }

    public searchGames(params: ISearchParam<IGame>[]): IGame[] | [] {
        const gamesList = this._getMapGames();

        return this._toolsService.filterGames(gamesList, params);
    }

    public createGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        const gameGroupsList = this._getMapGameGroups();

        gameGroupsList.push(gameGroup);

        const file = this._fileService.generateFile(gameGroupsList);

        return this._diskService.uploadFile(file, EPathFiles.GAMES_GROUPS)
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

        return this._diskService.uploadFile(file, EPathFiles.GAMES_GROUPS)
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

        return this._diskService.uploadFile(file, EPathFiles.GAMES_GROUPS)
            .pipe(map(() => {
                this._gameGroupMap.delete(id);

                return successMsg;
            }));
    }

    public getPlatformByType(type: EPlatform): IPlatform | undefined {
        const platformsList = this._getMapPlatforms();

        return platformsList.find(platformItem => platformItem.type === type);
    }

    // Platforms

    public getPlatforms(): Observable<IPlatform[]> {
        return this._toolsService.serverDelay(() => {
            return this._getMapPlatforms();
        }, 1);
    }

    // Maps

    private _setMapGames(games: IGame[]): void {
        this._gamesMap = new Map(
            games.map(game => [ game.id, game ])
        );
    }

    private _setMapGame(game: IGame): void {
        this._gamesMap.set(game.id, game);
    }

    private _getMapGames(): IGame[] {
        return [ ...this._gamesMap.values() ];
    }

    private _setMapGameGroups(gameGroups: IGameGroup[]): void {
        this._gameGroupMap = new Map(
            gameGroups.map(gameGroup => [ gameGroup.id, gameGroup ])
        );
    }

    private _setMapGameGroup(gameGroup: IGameGroup): void {
        this._gameGroupMap.set(gameGroup.id, gameGroup);
    }

    private _getMapGameGroups(): IGameGroup[] {
        return this._gameGroupMap && [ ...this._gameGroupMap.values() ];
    }

    private _setMapPlatforms(platforms: IPlatform[]): void {
        this._platformsMap = new Map(
            platforms.map(platform => [ platform.type, platform ])
        );
    }

    private _getMapPlatforms(): IPlatform[] {
        return [ ...this._platformsMap.values() ];
    }
}
