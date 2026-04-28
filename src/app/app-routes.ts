import type { Routes } from '@angular/router';

// import { GameComponent } from './pages/game/game.component';
// import { HomeComponent } from './pages/home/home.component';
// import { SettingsComponent } from './components/settings/settings.component';
// import { AuthComponent } from './pages/auth/auth.component';
// import { YandexTokenComponent } from './pages/auth/yandexToken/yandex-token.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    /*
    {
        path: 'token',
        loadComponent: () => import('./pages/auth/yandexToken/yandex-token.component')
            .then(c => c.YandexTokenComponent)
    },
    {
        path: 'auth',
        loadComponent: () => import('./pages/auth/auth.component')
            .then(c => c.AuthComponent)
    },
    */
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
    { path: '**', redirectTo: 'home', pathMatch: 'full' },



    // { path: 'token', component: YandexTokenComponent },
    // { path: 'auth', component: AuthComponent },
    // { path: 'home', component: HomeComponent },
    // { path: 'game', component: GameComponent },
    // { path: 'game/:id', component: GameComponent },
    // { path: 'settings', component: SettingsComponent },
];
