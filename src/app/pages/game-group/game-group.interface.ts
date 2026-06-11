import type { FormControl } from "@angular/forms";

export interface IGameGroupForm {
    id: FormControl<string | null>;
    name: FormControl<string | null>;
    dateEdit: FormControl<string | null>;
}