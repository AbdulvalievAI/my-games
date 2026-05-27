import type { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component')
            .then(c => c.HomeComponent)
    },
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
    {
        path: 'settings',
        loadComponent: () => import('./components/settings/settings.component')
            .then(c => c.SettingsComponent)
    },
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
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
