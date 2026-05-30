import { Injectable } from "@angular/core";
import cloneDeep from "lodash-es/cloneDeep";

import type { IGame, IGameGroup } from "../../types/games.interfaces";
import type { IPlatform } from "../../types/platforms.interfaces";
import { gameGroups } from "./game-groups";
import { games } from "./games";
import { platforms } from "./platforms";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private _games: IGame[] = cloneDeep(games);
    private _platforms: IPlatform[] = cloneDeep(platforms);
    private _gameGroups: IGameGroup[] = cloneDeep(gameGroups);


    public get games(): IGame[] {
        return cloneDeep(this._games);
    }

    public set games(games: IGame[]) {
        this._games = cloneDeep(games);
    }

    public get platforms(): IPlatform[] {
        return cloneDeep(this._platforms);
    }

    public set platforms(platforms: IPlatform[]) {
        this._platforms = cloneDeep(platforms);
    }

    public get gameGroups(): IGameGroup[] {
        return cloneDeep(this._gameGroups);
    }

    public set gameGroups(gameGroups: IGameGroup[]) {
        this._gameGroups = cloneDeep(gameGroups);
    }
}
