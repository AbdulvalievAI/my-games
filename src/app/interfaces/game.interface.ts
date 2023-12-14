import { EPlatform } from "../enums/platform.enums";


export interface IGame {
    id: number | string,
    name: string,
    logo: string,
    platforms: EPlatform[],
    dateEdit: string;
}
