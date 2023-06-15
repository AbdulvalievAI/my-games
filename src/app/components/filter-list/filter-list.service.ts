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
    public readonly filters: BehaviorSubject<IFilterListSettings>;
    
    
    constructor(
        private dataService: DataService,
    ) {
        this.defaultGameList = this.dataService.games;
        this.filters = new BehaviorSubject(this.defaultFilters);
    }
    
      
    public applyFilterGameList(filters: IFilterListSettings): IGame[] {
        let resultGameList: IGame[] = this.defaultGameList;
        
        if (filters.searchText) {
            resultGameList = resultGameList.filter(game => game.name.includes(filters.searchText as string));
        }
        
        return resultGameList;
    }
}
