import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class ExplorerService {
    private readonly _router = inject(Router);

    public goToYandexSearch(text: string | null | undefined, prefix = 'игра'): void {
        if (text?.trim()) {
            window.open(`https://yandex.ru/search?text=${prefix} ${text.trim()}`, '_blank');
        }
    }

    public goToYandexImage(text: string | null | undefined, prefix = 'игра'): void {
        if (text?.trim()) {
            window.open(`https://yandex.ru/images/search?text=${prefix} ${text.trim()}`, '_blank');
        }
    }

    public goToHome(): void {
        this._router.navigate([ '/home' ]);
    }

    public goToAddGame(): void {
        this._router.navigate([ '/game' ]);
    }

    public goToGameEdit(id: string): void {
        this._router.navigate(this._getPathGameEdit(id));
    }

    public openBlankGameEdit(id: string): void {
        const url = this._router.serializeUrl(
            this._router.createUrlTree(this._getPathGameEdit(id)),
        );
        window.open(url, '_blank');
    }

    public goToGameGroupsList(): void {
        this._router.navigate([ '/gameGroupsList' ]);
    }

    public goToAddGameGroup(): void {
        this._router.navigate([ '/gameGroup' ]);
    }

    public goToGameGroupEdit(id: string): void {
        this._router.navigate(this._getPathGameGroupEdit(id));
    }

    public openBlankGameGroupEdit(id: string): void {
        const url = this._router.serializeUrl(
            this._router.createUrlTree(this._getPathGameGroupEdit(id)),
        );
        window.open(url, '_blank');
    }

    private _getPathGameEdit(id: string) {
        return [ '/game', id ];
    }

    private _getPathGameGroupEdit(id: string) {
        return [ '/gameGroup', id ];
    }
}
