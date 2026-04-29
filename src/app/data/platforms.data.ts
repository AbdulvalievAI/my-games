import type { IPlatform } from "../types/platforms.interfaces";

export enum EPlatform {
    LOCAL = 'local',
    STEAM = 'steam',
    EPIC = 'epic',
    UBISOFT = 'ubisoft',
    GOG = 'gog',
    ROCKSTAR = 'rockstar',
    BATTLE = 'battle',
    ARC = 'arc',
    EA = 'electronicarts',
    BETHESDA = 'bethesda',
    VKPLAY = 'vkplay'
}

export enum EPlatformLogo {
    LOCAL = '/assets/platforms_logo/Users.ico',
    STEAM = '/assets/platforms_logo/Steam.ico',
    EPIC = '/assets/platforms_logo/epic_games.svg',
    UBISOFT = '/assets/platforms_logo/ubisoft.png',
    GOG = '/assets/platforms_logo/gog_galaxy.svg',
    ROCKSTAR = '/assets/platforms_logo/rockstar.svg',
    BATTLE = '/assets/platforms_logo/Battlenet.ico',
    ARC = '/assets/platforms_logo/arc.png',
    EA = '/assets/platforms_logo/Electronic_Arts.png',
    BETHESDA = '/assets/platforms_logo/bethesda.jpg',
    VKPLAY = '/assets/platforms_logo/vkplay.png',
    EMPTY = '/assets/alternative.png',
}

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
