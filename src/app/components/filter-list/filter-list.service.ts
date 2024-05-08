import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IGame } from 'src/app/interfaces/game.interface';
import { DataService } from 'src/app/services/data.service';
import { IFilterListSettings } from './filter-list.component.interface';

@Injectable({
  providedIn: 'root'
})
export class FilterListService {
    private defaultGameList: IGame[];
    private readonly defaultFilters: IFilterListSettings = {
		searchText: '',
	};
    public filters: BehaviorSubject<IFilterListSettings>;
    
    
    constructor(
        private dataService: DataService,
    ) {
        this.dataService.changeGames$.subscribe(games => {
            this.defaultGameList = games;
            this.filters = new BehaviorSubject(this.defaultFilters);
        });
    }
    
    private sortByDateEdit(games: IGame[]): void {
        games.sort((a,b) => {
            const dateA = new Date(a.dateEdit);
            const dateB = new Date(b.dateEdit);
           
            return dateB.getTime() - dateA.getTime();
        });
    }
    
    private sortByAlphabet(games: IGame[]): void {
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
    
    public applyFilterGameList(filters: IFilterListSettings): IGame[] {
        let resultGameList: IGame[] = this.defaultGameList;
        
        if (filters.searchText) {
            resultGameList = resultGameList.filter(game => game.name.toLowerCase().includes(filters.searchText as string));
        }
        
        this.sortByAlphabet(resultGameList);
        
        return resultGameList;
    }
}
