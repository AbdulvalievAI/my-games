import type { EPlatform } from "../data/platforms";

export interface IGame {
    id: string;
    name: string;
    logo: string;
    platforms: EPlatform[];
    dateEdit: string;
    groups?: IGameGroup['id'][];
    completed?: boolean;
}

export interface IGameGroup {
    id: string;
    name: string;
    dateEdit: string;
}
