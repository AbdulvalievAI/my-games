import { EPlatform, EPlatformLogo } from "../enums/platform.enums";
import { IPlatform } from "../interfaces/platform.interface";


export const platformsList: IPlatform[] = [
    {
        id: 0,
        name: 'Local',
        logo: EPlatformLogo.LOCAL,
        type: EPlatform.LOCAL,
    },
    {
        id: 1,
        name: 'Steam',
        logo: EPlatformLogo.STEAM,
        type: EPlatform.STEAM,
    },
    {
        id: 2,
        name: 'Epic Games',
        logo: EPlatformLogo.EPIC,
        type: EPlatform.EPIC,
    },
    {
        id: 3,
        name: 'Ubisoft',
        logo: EPlatformLogo.UBISOFT,
        type: EPlatform.UBISOFT,
    },
    {
        id: 4,
        name: 'GOG Galaxy',
        logo: EPlatformLogo.GOG,
        type: EPlatform.GOG,
    },
    {
        id: 5,
        name: 'Rockstar Games',
        logo: EPlatformLogo.ROCKSTAR,
        type: EPlatform.ROCKSTAR,
    },
    {
        id: 6,
        name: 'Battle.net',
        logo: EPlatformLogo.BATTLE,
        type: EPlatform.BATTLE,
    },
    {
        id: 7,
        name: 'Arc',
        logo: EPlatformLogo.ARC,
        type: EPlatform.ARC,
    },
    {
        id: 8,
        name: 'Electronic Arts',
        logo: EPlatformLogo.EA,
        type: EPlatform.EA,
    },
    {
        id: 9,
        name: 'Bethesda.net',
        logo: EPlatformLogo.BETHESDA,
        type: EPlatform.BETHESDA,
    },
    {
        id: 11,
        name: 'VK Play',
        logo: EPlatformLogo.VKPLAY,
        type: EPlatform.VKPLAY,
    }
];