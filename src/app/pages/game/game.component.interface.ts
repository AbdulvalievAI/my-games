import { IGame } from "src/app/data/games/games.interfaces";
import { IPlatform } from "src/app/data/platforms/platforms.interfaces";

export interface INewGameData extends Omit<IGame, 'platforms'> {
    platforms: IPlatform[];
}
