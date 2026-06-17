import {
    inject,
    Injectable,
    type OnDestroy,
} from '@angular/core';
import isEqual from 'lodash-es/isEqual';
import {
    type Observable,
    Subject,
    takeUntil,
} from 'rxjs';

import type { IServerMessage } from '../../types/api.interfaces';
import type { IGameGroup } from '../../types/games.interfaces';
import { DataService } from './data/data.service';

@Injectable()
export class GameGroupsService implements OnDestroy {
    private readonly _dataService = inject(DataService);

    private readonly _destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public createGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        return this._dataService.createGameGroup(gameGroup)
            .pipe(takeUntil(this._destroy$));
    }

    public getGameGroupById(id: string): IGameGroup | undefined {
        return this._dataService.getGameGroupById(id);
    }

    public getGameGroups(): Observable<IGameGroup[]> {
        return this._dataService.getGameGroups()
            .pipe(takeUntil(this._destroy$));
    }

    public updateGameGroup(gameGroup: IGameGroup): Observable<IGameGroup> {
        return this._dataService.updateGameGroup(gameGroup)
            .pipe(takeUntil(this._destroy$));
    }

    public deleteGameGroup(id: string): Observable<IServerMessage> {
        return this._dataService.deleteGameGroup(id)
            .pipe(takeUntil(this._destroy$));
    }

    public checkStructure(gameGroups: IGameGroup[]): boolean {
        const templateKeys: (keyof IGameGroup)[] = [ 'id', 'name', 'dateEdit' ];
        const mapKeys = (gameGroupKeys: (keyof IGameGroup)[]) => {
            return gameGroupKeys.filter(key => templateKeys.includes(key));
        };
        const resCheck = gameGroups.filter(gameGroupItem => {
            const itemKeys = mapKeys(Object.keys(gameGroupItem) as (keyof IGameGroup)[]);
            const isCorrect = isEqual(templateKeys.sort(), itemKeys.sort());

            return !isCorrect;
        });

        return !resCheck.length;
    }
}
