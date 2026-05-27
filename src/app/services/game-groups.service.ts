import {
    inject,
    Injectable,
    type OnDestroy,
} from '@angular/core';
import {
    type Observable,
    Subject,
    takeUntil,
} from 'rxjs';

import type { IGameGroup } from '../types/games.interfaces';
import {
    FakeGamesApiService,
    type IServerMessage,
} from './fake-games-api.service';

@Injectable({
    providedIn: 'root'
})
export class GameGroupsService implements OnDestroy {
    private readonly _fgaService = inject(FakeGamesApiService);

    private readonly _destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public createGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        return this._fgaService.createGameGroup(gameGroup)
            .pipe(takeUntil(this._destroy$));
    }

    public getGameGroupById(id: string): Observable<IGameGroup | undefined> {
        return this._fgaService.getGameGroupById(id)
            .pipe(takeUntil(this._destroy$));
    }

    public getGameGroups(): Observable<IGameGroup[]> {
        return this._fgaService.getGameGroups()
            .pipe(takeUntil(this._destroy$));
    }

    public updateGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        return this._fgaService.updateGameGroup(gameGroup)
            .pipe(takeUntil(this._destroy$));
    }

    public deleteGameGroup(id: string): Observable<IServerMessage> {
        return this._fgaService.deleteGameGroup(id)
            .pipe(takeUntil(this._destroy$));
    }
}
