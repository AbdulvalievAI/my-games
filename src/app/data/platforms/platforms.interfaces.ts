
export interface IPlatform {
    id: number;
    name: string;
    type: EPlatform,
    logo: EPlatformLogo;
}

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
    VKPLAY = 'vkplay',
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
}
