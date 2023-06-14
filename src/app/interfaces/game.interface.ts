import { EPlatform } from "../enums/platform.enums";


export interface IGame {
    id: number,
    name: string,
    logo: string,
    platforms: EPlatform[],
}
