import type { EPlatform, EPlatformLogo } from "../data/platforms.data";

export interface IPlatform {
    id: number;
    name: string;
    type: EPlatform,
    logo: EPlatformLogo;
}
