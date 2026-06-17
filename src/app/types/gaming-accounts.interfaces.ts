import type { EPlatform } from "../data/platforms";

export interface IGamingAccount {
    id: string;
    name: string;
    platform: EPlatform;
    dateEdit: string;
}
