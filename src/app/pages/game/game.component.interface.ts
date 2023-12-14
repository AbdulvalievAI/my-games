import { IGame } from "src/app/interfaces/game.interface";
import { IPlatform } from "src/app/interfaces/platform.interface";

export interface INewGameData extends Omit<IGame, 'platforms'> {
    platforms: IPlatform[];
}
