import type { EPlatform } from "../data/platforms";
import type { IGamingAccount } from "./gaming-accounts.interfaces";

export interface IGame {
    id: string;
    name: string;
    logo: string;
    platforms: EPlatform[];
    dateCreate?: string;
    dateEdit: string;
    groups?: IGameGroup['id'][];
    completed?: boolean;
    accounts?: IGamingAccount['id'][];
}

export interface IGameGroup {
    id: string;
    name: string;
    dateEdit: string;
}
