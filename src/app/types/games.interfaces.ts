import type { EPlatform } from "../data/platforms.data";

export interface IGamePattern {
    id: unknown;
    name: unknown;
    logo: unknown;
    platforms: unknown;
    dateEdit: unknown;
}

export interface IGame extends IGamePattern {
    id: string;
    name: string;
    logo: string;
    platforms: EPlatform[];
    dateEdit: string;
}
