import type { FormControl } from "@angular/forms";

import type { IGameGroup } from "../../types/games.interfaces";
import type { IGamingAccount } from "../../types/gaming-accounts.interfaces";
import type { IPlatform } from "../../types/platforms.interfaces";

export interface IGameFormValue {
    id: string;
    name: string;
    logo: string;
    dateCreate?: string;
    dateEdit?: string;
    completed: boolean;
    platforms: IPlatform[];
    gameGroups: IGameGroup[];
    accounts: IGamingAccount[];
}

export interface IGameForm {
    id: FormControl<string | null>;
    name: FormControl<string | null>;
    logo: FormControl<string | null>;
    platforms: FormControl<IPlatform[] | null>;
    dateCreate: FormControl<string | null>;
    dateEdit: FormControl<string | null>;
    gameGroups: FormControl<IGameGroup[] | null>;
    completed: FormControl<boolean | null>;
    accounts: FormControl<IGamingAccount[] | null>;
}
