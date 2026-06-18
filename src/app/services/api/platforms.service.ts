import { inject, Injectable,type OnDestroy } from '@angular/core';
import { type Observable,Subject, takeUntil } from 'rxjs';

import { type EPlatform } from '../../data/platforms';
import {
    type IPlatform,
} from '../../types/platforms.interfaces';
import { DataService } from './data/data.service';

@Injectable()
export class PlatformsService implements OnDestroy {
    private readonly _dataService = inject(DataService);

    private readonly _destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public getPlatforms(): Observable<IPlatform[]> {
        return this._dataService.getPlatforms()
            .pipe(takeUntil(this._destroy$));
    }

    public getPlatformsByTypes(platformList: IPlatform[], ids: IPlatform['type'][]): IPlatform[] {
        return platformList.filter(item => ids.includes(item.type));
    }

    public getPlatformByType(type: EPlatform | undefined): IPlatform | undefined {
        return this._dataService.getPlatformByType(type);
    }
}
