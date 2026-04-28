import type { EPlatform } from "../data/platforms.data";

export interface IGame {
    id: string;
    name: string;
    logo: string;
    platforms: EPlatform[];
    dateEdit: string;
}
