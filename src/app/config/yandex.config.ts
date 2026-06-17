export const yandexAuthConfig = {
    redirectUri: 'https://oauth.yandex.ru/verification_code',
    authUrl: 'https://oauth.yandex.ru/authorize',
};

export const yandexDiskConfig = {
    diskUrl: 'https://cloud-api.yandex.net/v1/disk/',
    folderPath: 'my_game_db',
    /** Костыль так как яндекс диск не хочет сохранять структуры вида: [] */
    emptyFileContent: 'EMPTY_FILE',
};

export enum EYdxFileNames {
    GAMES = 'db_games.json',
    GAMES_GROUPS = 'db_games_groups.json',
    PLATFORMS = 'db_platforms.json',
    GAMING_ACCOUNTS = 'db_gaming_accounts.json'
}
