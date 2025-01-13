import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IGame } from '../../data/games/games.interfaces';
import { GamesService } from '../../data/games/games.service';

import { IFilterListSettings } from './filter-list.component.interface';

@Injectable({
  providedIn: 'root'
})
export class FilterListService {
    public filters: BehaviorSubject<IFilterListSettings>;
    
    private _defaultGameList: IGame[];
    private readonly _defaultFilters: IFilterListSettings = {
		searchText: '',
	};
    
    constructor(
        private _gamesService: GamesService,
    ) {
        this._gamesService.changeGames$.subscribe(games => {
            this._defaultGameList = games;
            this.filters = new BehaviorSubject(this._defaultFilters);
        });
    }

    
    public applyFilterGameList(filters: IFilterListSettings): IGame[] {
        let resultGameList: IGame[] = this._defaultGameList;
        
        if (filters.searchText) {
            resultGameList = resultGameList.filter(game => game.name.toLowerCase().includes(filters.searchText as string));
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
