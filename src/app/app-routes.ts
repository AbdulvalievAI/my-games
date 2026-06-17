import type { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component')
            .then(c => c.HomeComponent)
    },
    {
        path: 'settings',
        loadComponent: () => import('./components/settings/settings.component')
            .then(c => c.SettingsComponent)
    },

    /* Games */

    {
        path: 'game',
        loadComponent: () => import('./pages/game/game.component')
            .then(c => c.GameComponent)
    },
    {
        path: 'game/:id',
        loadComponent: () => import('./pages/game/game.component')
            .then(c => c.GameComponent)
    },

    /* Games Groups */

    {
        path: 'gameGroupsList',
        loadComponent: () => import('./pages/game-groups-list/game-groups-list.component')
            .then(c => c.GameGroupsListComponent)

    },
    {
        path: 'gameGroup',
        loadComponent: () => import('./pages/game-group/game-group.component')
            .then(c => c.GameGroupComponent)
    },
    {
        path: 'gameGroup/:id',
        loadComponent: () => import('./pages/game-group/game-group.component')
            .then(c => c.GameGroupComponent)
    },

    /* Gaming Accounts */
    {
        path: 'gamingAccountsList',
        loadComponent: () => import('./pages/gaming-accounts-list/gaming-accounts-list.component')
            .then(c => c.GamingAccountsListComponent)
    },
    {
        path: 'gamingAccount',
        loadComponent: () => import('./pages/gaming-account/gaming-account.component')
            .then(c => c.GamingAccountComponent)
    },
    {
        path: 'gamingAccount/:id',
        loadComponent: () => import('./pages/gaming-account/gaming-account.component')
            .then(c => c.GamingAccountComponent)
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
