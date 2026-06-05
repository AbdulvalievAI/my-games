/* import { inject, Injectable } from "@angular/core";
import type { Observable } from "rxjs";

import type { IDataPointService, IServerMessage } from "../../../types/api.interfaces";
import type { IGame, IGameGroup } from "../../../types/games.interfaces";
import type { IPlatform } from "../../../types/platforms.interfaces";
import type { ISearchParam } from "../../tools.service";
import { AuthService } from "../auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataCloudService implements IDataPointService {
    private readonly _authService = inject(AuthService);

    private _gamesMap: Map<string, IGame>
    private _gameGroupMap: Map<string, IGameGroup>;
    private _platformsMap: Map<string, IPlatform>;

    // Game

    public createGame(game: IGame): Observable<IGame> {
        throw new Error("Method not implemented.");
    }

    public getGameById(id: string): Observable<IGame | undefined> {
        throw new Error("Method not implemented.");
    }

    public getGames(): Observable<IGame[]> {
        throw new Error("Method not implemented.");
    }

    public updateGame(game: IGame): Observable<IGame> {
        throw new Error("Method not implemented.");
    }

    public deleteGame(id: string): Observable<IServerMessage> {
        throw new Error("Method not implemented.");
    }

    public searchGames(params: ISearchParam<IGame>[]): Observable<IGame[] | []> {
        throw new Error("Method not implemented.");
    }

    // GameGroup

    public createGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        throw new Error("Method not implemented.");
    }

    public getGameGroupById(id: string): Observable<IGameGroup | undefined> {
        throw new Error("Method not implemented.");
    }

    public getGameGroups(): Observable<IGameGroup[]> {
        throw new Error("Method not implemented.");
    }

    public updateGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        throw new Error("Method not implemented.");
    }

    public deleteGameGroup(id: string): Observable<IServerMessage> {
        throw new Error("Method not implemented.");
    }

    // /Platforms

    public getPlatforms(): Observable<IPlatform[]> {
        throw new Error("Method not implemented.");
    }

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
        return [ ...this._gameGroupMap.values() ];
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
 */