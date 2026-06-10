export const yandexAuthConfig = {
    redirectUri: 'https://oauth.yandex.ru/verification_code',
    authUrl: 'https://oauth.yandex.ru/authorize',
};

export const yandexDiskConfig = {
    diskUrl: 'https://cloud-api.yandex.net/v1/disk/',
    folderPath: 'my_game_db',
};

export enum EYdxFileNames {
    GAMES = 'db_games.json',
    GAMES_GROUPS = 'db_games_groups.json',
    PLATFORMS = 'db_platforms.json'
}
