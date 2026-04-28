import { inject,Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { GamesService } from '../../services/games.service';
import type { IGame } from '../../types/games.interfaces';
import type { IPlatform } from '../../types/platforms.interfaces';
import type { IFilters } from './filter-list.component.interface';

@Injectable({
    providedIn: 'root'
})
export class FilterListService {
    private readonly _gamesService = inject(GamesService);

    public filters: BehaviorSubject<IFilters>;

    private _defaultGameList: IGame[];
    private readonly _defaultFilters: IFilters = {
		search: '',
        platform: null,
	};

    constructor(
    ) {
        this._gamesService.changeGames$.subscribe(games => {
            this._defaultGameList = games;
            this.filters = new BehaviorSubject(this._defaultFilters);
        });
    }


    public applyFilterGameList(filters: IFilters): IGame[] {
        let resultGameList: IGame[] = this._defaultGameList;
        const search = filters.search as string;
        const platform = filters.platform as IPlatform;

        if (search) {
            resultGameList = resultGameList.filter(game => game.name.toLowerCase().includes(search));
        }

        if (platform) {
            resultGameList = resultGameList.filter(game => game.platforms.includes(platform.type));
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
