import {
    Injectable,
    type OnDestroy,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import type { IGame } from '../../types/games.interfaces';
import type { IFilters } from './filter-list.interface';

@Injectable()
export class FilterListService implements OnDestroy {
    public filters$: BehaviorSubject<IFilters>;

    private _defaultGamesList: IGame[];
    private readonly _defaultFilters: IFilters = {
		search: '',
        platform: null,
	};
    private readonly _destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public initialize(games: IGame[]): void {
        this._defaultGamesList = games;
        this.filters$ = new BehaviorSubject(this._defaultFilters);
    }

    public applyFilterGamesList(filters: IFilters): IGame[] {
        let resultGamesList: IGame[] = this._defaultGamesList;
        const search = filters.search;
        const platform = filters.platform;
        const group = filters.group;
        const account = filters.account;
        const completed = filters.completed;

        if (search) {
            resultGamesList = resultGamesList.filter(game => game.name.toLowerCase().includes(search));
        }

        if (platform) {
            resultGamesList = resultGamesList.filter(game => game.platforms.includes(platform.type));
        }

        if (group) {
            resultGamesList = resultGamesList.filter(game => game.groups?.includes(group.id));
        }

        if (account) {
            resultGamesList = resultGamesList.filter(game => game.accounts?.includes(account.id));
        }

        if (completed) {
            resultGamesList = resultGamesList.filter(game => game.completed);
        }

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
