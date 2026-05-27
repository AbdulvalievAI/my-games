import type { FormControl } from "@angular/forms";

export interface INewGameGroup {
    id: FormControl<string | null>;
    name: FormControl<string | null>;
}