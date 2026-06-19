import type { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    /* Games */

    {
        path: 'home',
        title: 'Список игр',
        loadComponent: () => import('./pages/home/home.component')
            .then(c => c.HomeComponent)
    },
    {
        path: 'game',
        title: 'Создание игры',
        loadComponent: () => import('./pages/game/game.component')
            .then(c => c.GameComponent)
    },
    {
        path: 'game/:id',
        title: 'Редактирование игры',
        loadComponent: () => import('./pages/game/game.component')
            .then(c => c.GameComponent)
    },

    /* Games Groups */

    {
        path: 'gameGroupsList',
        title: 'Список групп',
        loadComponent: () => import('./pages/game-groups-list/game-groups-list.component')
            .then(c => c.GameGroupsListComponent)

    },
    {
        path: 'gameGroup',
        title: 'Создание группы',
        loadComponent: () => import('./pages/game-group/game-group.component')
            .then(c => c.GameGroupComponent)
    },
    {
        path: 'gameGroup/:id',
        title: 'Редактирование группы',
        loadComponent: () => import('./pages/game-group/game-group.component')
            .then(c => c.GameGroupComponent)
    },

    /* Gaming Accounts */
    {
        path: 'gamingAccountsList',
        title: 'Список аккаунтов',
        loadComponent: () => import('./pages/gaming-accounts-list/gaming-accounts-list.component')
            .then(c => c.GamingAccountsListComponent)
    },
    {
        path: 'gamingAccount',
        title: 'Создание аккаунта',
        loadComponent: () => import('./pages/gaming-account/gaming-account.component')
            .then(c => c.GamingAccountComponent)
    },
    {
        path: 'gamingAccount/:id',
        title: 'Редактирование аккаунта',
        loadComponent: () => import('./pages/gaming-account/gaming-account.component')
            .then(c => c.GamingAccountComponent)
    },

    /* Прочее */

    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
