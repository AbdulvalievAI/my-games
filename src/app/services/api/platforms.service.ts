import { inject, Injectable,type OnDestroy } from '@angular/core';
import { type Observable,Subject, takeUntil } from 'rxjs';

import type { IApiPlatforms } from '../../types/api.interfaces';
import {
    type IPlatform,
} from '../../types/platforms.interfaces';
import { DataService } from '../data/data.service';
import { type EPlatform } from '../data/platforms';
import { FakeGamesApiService } from './fake-games-api.service';

@Injectable()
export class PlatformsService implements OnDestroy, IApiPlatforms {
    public readonly _dataService = inject(DataService);
    private readonly _fgaService = inject(FakeGamesApiService);

    public _platformsObject: Partial<Record<EPlatform, IPlatform>> = {};

    private readonly _destroy$ = new Subject<void>();

    constructor() {
        const platformsList = this._dataService.platforms;

        platformsList.forEach(item => {
            this._platformsObject[item.type] = item;
        });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public getPlatforms(): Observable<IPlatform[]> {
        return this._fgaService.getPlatforms()
            .pipe(takeUntil(this._destroy$));
    }

    public getPlatform(typePlatform: EPlatform): IPlatform | undefined {
        return this._platformsObject[typePlatform];
    }

    public getPlatformsByTypes(platformList: IPlatform[],ids: IPlatform['type'][]): IPlatform[] {
        return platformList.filter(item => ids.includes(item.type));
    }
}
