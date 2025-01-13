import { EPlatform } from "../platforms/platforms.interfaces";

export interface IGame {
    id: number | string,
    name: string,
    logo: string,
    platforms: EPlatform[],
    dateEdit: string;
}
