// theme.service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class ThemeService {
    private currentTheme = 'indigo-pink';

    private readonly themeMap: Record<string, string> = {
        'azure-blue': 'assets/themes/azure-blue.css',
        'cyan-orange': 'assets/themes/cyan-orange.css',
        'deeppurple-amber': 'assets/themes/deeppurple-amber.css',
        'indigo-pink': 'assets/themes/indigo-pink.css',
        'magenta-violet': 'assets/themes/magenta-violet.css',
        'pink-bluegrey': 'assets/themes/pink-bluegrey.css',
        'purple-green': 'assets/themes/purple-green.css',
        'rose-red': 'assets/themes/rose-red.css'
    };

    public setTheme(themeName: string): void {
        const themeUrl = this.themeMap[themeName];

        if (!themeUrl) {
            console.warn(`Theme "${themeName}" not found in themeMap`);

            return;
        }

        this._removeCurrentTheme();
        this._loadTheme(themeUrl)
            .then(() => {
                this.currentTheme = themeName;
                localStorage.setItem('app-theme', themeName);
            })
            .catch((error) => {
                console.error('Failed to load theme:', error);
                // Откат к дефолтной теме
                this.setTheme('indigo-pink');
            });
    }

    public getTheme(): string {
        return this.currentTheme;
    }

    private _loadTheme(url: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');

            link.rel = 'stylesheet';
            link.href = url;
            link.id = 'app-theme';
            link.onload = () => resolve();
            link.onerror = (err) => reject(err);

            document.head.appendChild(link);
        });
    }

    private _removeCurrentTheme(): void {
        const oldLink = document.getElementById('app-theme');

        if (oldLink) {
            oldLink.remove();
        }
    }

    public initializeTheme(): void {
        const savedTheme = localStorage.getItem('app-theme');

        if (savedTheme && this.themeMap[savedTheme]) {
            this.setTheme(savedTheme);
        } else {
            this.setTheme('indigo-pink');
        }
    }
}
