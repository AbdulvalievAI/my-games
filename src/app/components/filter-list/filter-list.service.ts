import {
    Injectable,
    type OnDestroy,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import type { IGame, IGameGroup } from '../../types/games.interfaces';
import type { IPlatform } from '../../types/platforms.interfaces';
import type { IFilters } from './filter-list.interface';

@Injectable()
export class FilterListService implements OnDestroy {
    public filters$: BehaviorSubject<IFilters>;

    private _defaultGameList: IGame[];
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
        this._defaultGameList = games;
        this.filters$ = new BehaviorSubject(this._defaultFilters);
    }

    public applyFilterGameList(filters: IFilters): IGame[] {
        let resultGameList: IGame[] = this._defaultGameList;
        const search = filters.search as string;
        const platform = filters.platform as IPlatform;
        const group = filters.group as IGameGroup;

        if (search) {
            resultGameList = resultGameList.filter(game => game.name.toLowerCase().includes(search));
        }

        if (platform) {
            resultGameList = resultGameList.filter(game => game.platforms.includes(platform.type));
        }

        if (group) {
            resultGameList = resultGameList.filter(game => game.groups?.includes(group.id));
        }

        this._sortByAlphabet(resultGameList);

        return resultGameList;
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
