import type { EPlatform } from "../services/data/platforms";

export interface IGame {
    id: string;
    name: string;
    logo: string;
    platforms: EPlatform[];
    dateEdit: string;
    groups?: IGameGroup['id'][];
}

export interface IGameGroup {
    id: string;
    name: string;
}

