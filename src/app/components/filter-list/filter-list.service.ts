import {
    Injectable,
    type OnDestroy,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import type { IGame, IGameGroup } from '../../types/games.interfaces';
import type { IGamingAccount } from '../../types/gaming-accounts.interfaces';
import type { IPlatform } from '../../types/platforms.interfaces';
import type { TQueueFilters, TTypesFilters } from './filter-list.interface';

@Injectable()
export class FilterListService implements OnDestroy {
    public filters$: BehaviorSubject<TQueueFilters>;

    private _defaultGamesList: IGame[];
    private readonly _defaultFilters: TQueueFilters = {};
    private readonly _destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public initialize(games: IGame[]): void {
        this._defaultGamesList = games;
        this.filters$ = new BehaviorSubject(this._defaultFilters);
    }

    public applyFilterGamesList(filters: TQueueFilters): IGame[] {
        let resultGamesList: IGame[] = this._defaultGamesList;

        const filterArray = Object.entries(filters)
            .filter(([ _, value ]) => value !== undefined)
            .map(([ key, value ]) => ({
                type: key as TTypesFilters,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                queue: value!.queue as number,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                value: value!.value,
            }))
            .sort((a, b) => a.queue - b.queue);

        filterArray.forEach(filterItem => {
            switch (filterItem.type) {
                case 'search': {
                    const value = filterItem.value as string;

                    resultGamesList = resultGamesList.filter(game => game.name.toLowerCase().includes(value.toLowerCase()));
                    break;
                }
                case 'platform': {
                    const value = filterItem.value as IPlatform;

                    resultGamesList = resultGamesList.filter(game => game.platforms.includes(value.type));
                    break;
                }
                case 'group': {
                    const value = filterItem.value as IGameGroup;

                    resultGamesList = resultGamesList.filter(game => game.groups?.includes(value.id));
                    break;
                }
                case 'account': {
                    const value = filterItem.value as IGamingAccount;

                    resultGamesList = resultGamesList.filter(game => game.accounts?.includes(value.id));
                    break;
                }
                case 'completed': {
                    resultGamesList = resultGamesList.filter(game => game.completed);
                    break;
                }
            }
        });

        this._sortByAlphabet(resultGamesList);

        return resultGamesList;
    }

    private _sortByAlphabet(games: IGame[]): void {
        games.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }

            return 0;
        });
    }

    /*
    private _sortByDateEdit(games: IGame[]): void {
        games.sort((a,b) => {
            const dateA = new Date(a.dateEdit);
            const dateB = new Date(b.dateEdit);

            return dateB.getTime() - dateA.getTime();
        });
    }
    */
}
