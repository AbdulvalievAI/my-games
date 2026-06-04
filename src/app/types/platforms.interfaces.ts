import type { EPlatform, EPlatformLogo } from "../data/platforms";

export interface IPlatform {
    id: string;
    name: string;
    type: EPlatform,
    logo: EPlatformLogo;
}
