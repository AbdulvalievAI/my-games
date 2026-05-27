import type { FormControl } from "@angular/forms";

import type { IGameGroup } from "../../types/games.interfaces";
import type { IPlatform } from "../../types/platforms.interfaces";

export interface IFilterForm {
    search: FormControl<string | null>;
    platform: FormControl<IPlatform | null>;
    group: FormControl<IGameGroup | null>;
}

export interface IFilters {
    search?: string | null;
    platform?: IPlatform  | null;
    group?: IGameGroup | null;
}
