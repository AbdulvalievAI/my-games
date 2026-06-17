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
import type { IGamingAccount } from '../../types/gaming-accounts.interfaces';
import { DataService } from './data/data.service';

@Injectable()
export class GamingAccountsService implements OnDestroy {
    private readonly _dataService = inject(DataService);

    private readonly _destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public createGamingAccount(account: IGamingAccount): Observable<IGamingAccount> {
        return this._dataService.createGamingAccount(account)
            .pipe(takeUntil(this._destroy$));
    }

    public getGamingAccountById(id: string): IGamingAccount | undefined {
        return this._dataService.getGamingAccountById(id);
    }

    public getGamingAccounts(): Observable<IGamingAccount[]> {
        return this._dataService.getGamingAccounts()
            .pipe(takeUntil(this._destroy$));
    }

    public updateGamingAccount(account: IGamingAccount): Observable<IGamingAccount> {
        return this._dataService.updateGamingAccount(account)
            .pipe(takeUntil(this._destroy$));
    }

    public deleteGamingAccount(id: string): Observable<IServerMessage> {
        return this._dataService.deleteGamingAccount(id)
            .pipe(takeUntil(this._destroy$));
    }

    public checkStructure(accounts: IGamingAccount[]): boolean {
        const templateKeys: (keyof IGamingAccount)[] = [ 'id', 'name', 'dateEdit' ];
        const mapKeys = (gameGroupKeys: (keyof IGamingAccount)[]) => {
            return gameGroupKeys.filter(key => templateKeys.includes(key));
        };
        const resCheck = accounts.filter(accountItem => {
            const gameItemKeys = mapKeys(Object.keys(accountItem) as (keyof IGamingAccount)[]);
            const isCorrect = isEqual(templateKeys.sort(), gameItemKeys.sort());

            return !isCorrect;
        });

        return !resCheck.length;
    }
}
