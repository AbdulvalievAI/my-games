import type { FormControl } from "@angular/forms";

import type { IGameGroup } from "../../types/games.interfaces";
import type { IGamingAccount } from "../../types/gaming-accounts.interfaces";
import type { IPlatform } from "../../types/platforms.interfaces";

export interface IFilterForm {
    search: FormControl<string | null>;
    platform: FormControl<IPlatform | null>;
    group: FormControl<IGameGroup | null>;
    account: FormControl<IGamingAccount | null>;
    completed: FormControl<boolean | null>;
}

export interface IFilters {
    search?: string | null;
    platform?: IPlatform  | null;
    group?: IGameGroup | null;
    account?: IGamingAccount | null;
    completed?: boolean;
}

export type TTypesFilters = 'search' | 'platform' | 'group' | 'account' | 'completed';

export interface TQueueFilters {
    search?: {
        queue: number;
        value: string;
    };
    platform?: {
        queue: number;
        value: IPlatform;
    };
    group?: {
        queue: number;
        value: IGameGroup;
    };
    account?: {
        queue: number;
        value: IGamingAccount;
    };
    completed?: {
        queue: number;
        value: boolean;
    };
}
