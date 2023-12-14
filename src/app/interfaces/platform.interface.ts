import { EPlatform, EPlatformLogo } from "../enums/platform.enums";

export interface IPlatform {
    id: number;
    name: string;
    type: EPlatform,
    logo: EPlatformLogo;
}

