import type { FormControl } from "@angular/forms";

import type { IGame } from "../../types/games.interfaces";
import type { IPlatform } from "../../types/platforms.interfaces";

export interface IGamingAccountForm {
    id: FormControl<string | null>;
    name: FormControl<string | null>;
    dateEdit: FormControl<string | null>;
    platform: FormControl<IPlatform | null>;
    searchGame: FormControl<string | null>;
    games: FormControl<IGame[] | null>;
}

export interface IGamingAccountFormValue {
    id: string;
    name: string;
    dateEdit: string;
    platform: IPlatform;
    games?: IGame[] | null;
}
