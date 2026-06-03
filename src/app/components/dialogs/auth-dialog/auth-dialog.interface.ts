import type { FormControl } from "@angular/forms";

export interface IAuthForm {
    token?: FormControl<string | null>;
    clientId?: FormControl<string | null>;
}
