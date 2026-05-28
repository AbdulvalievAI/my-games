import type { EPlatform, EPlatformLogo } from "../services/data/platforms";

export interface IPlatform {
    id: number;
    name: string;
    type: EPlatform,
    logo: EPlatformLogo;
}
