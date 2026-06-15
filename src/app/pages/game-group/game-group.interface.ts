import type { FormControl } from "@angular/forms";

import type { IGame } from "../../types/games.interfaces";

export interface IGameGroupForm {
    id: FormControl<string | null>;
    name: FormControl<string | null>;
    dateEdit: FormControl<string | null>;
    searchGame: FormControl<string | null>;
    games: FormControl<IGame[] | null>;
}

export interface IGameGroupFormValue {
    id: string;
    name: string;
    dateEdit: string;
    games?: IGame[] | null;
}