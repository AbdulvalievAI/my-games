import type { FormControl } from "@angular/forms";

import type { IPlatform } from "../../types/platforms.interfaces";

export interface IFilterForm {
    search: FormControl<string | null>;
    platform: FormControl<IPlatform | null>;
}

export interface IFilters {
    search?: string | null;
    platform?: IPlatform  | null;
}
