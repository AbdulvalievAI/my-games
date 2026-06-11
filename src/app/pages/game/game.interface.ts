import type { FormControl } from "@angular/forms";

import type { IGame, IGameGroup } from "../../types/games.interfaces";
import type { IPlatform } from "../../types/platforms.interfaces";

export interface INewGameFormValue extends Omit<IGame, 'platforms'> {
    platforms: IPlatform[];
    gameGroups: IGameGroup[];
}

export interface INewGameForm {
    id: FormControl<string | null>;
    name: FormControl<string | null>;
    logo: FormControl<string | null>;
    platforms: FormControl<IPlatform[] | null>;
    dateEdit: FormControl<string | null>;
    gameGroups: FormControl<IGameGroup[] | null>;
    completed: FormControl<boolean | null>;
}