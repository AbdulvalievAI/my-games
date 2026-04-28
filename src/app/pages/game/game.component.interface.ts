import type { FormControl } from "@angular/forms";

import type { IGame, IGamePattern } from "../../types/games.interfaces";
import type { IPlatform } from "../../types/platforms.interfaces";

export interface INewGameFormValue extends Omit<IGame, 'platforms'> {
    platforms: IPlatform[];
}

export interface INewGameForm extends IGamePattern {
    id: FormControl<string | null>;
    name: FormControl<string | null>;
    logo: FormControl<string | null>;
    platforms: FormControl<IPlatform[] | null>;
    dateEdit: FormControl<string | null>;
}