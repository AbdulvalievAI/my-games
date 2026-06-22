import type { FormControl } from "@angular/forms";

import type { IGameGroup } from "../../types/games.interfaces";
import type { IGamingAccount } from "../../types/gaming-accounts.interfaces";
import type { IPlatform } from "../../types/platforms.interfaces";

export interface IFilterForm {
    search: FormControl<string | null>;
    platform: FormControl<IPlatform | null>;
    group: FormControl<IGameGroup | null>;
    account: FormControl<IGamingAccount | null>;
    sort: FormControl<ISortItem | null>;
    completed: FormControl<boolean | null>;
}

export interface IFilters {
    search?: string | null;
    platform?: IPlatform  | null;
    group?: IGameGroup | null;
    account?: IGamingAccount | null;
    sort?: ISortItem | null;
    completed?: boolean;
}

export type TTypesFilters = 'search' | 'platform' | 'group' | 'account' | 'completed' | 'sort';

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
    sort?: {
        queue: number;
        value: ISortItem;
    };
    completed?: {
        queue: number;
        value: boolean;
    };
}

export type TSort = 'createDate' | 'editDate' | 'alphabet';

export interface ISortItem {
    id: string;
    name: string;
    type: TSort;
    icon: string;
}
