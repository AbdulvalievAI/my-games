import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IGame } from '../../data/games/games.interfaces';

import { IFilterListSettings } from './filter-list.component.interface';
import { FilterListService } from './filter-list.service';

@Component({
    selector: 'filter-list',
    templateUrl: './filter-list.component.html',
    styleUrls: ['./filter-list.component.scss'],
    standalone: false
})
export class FilterComponent implements OnInit {
	@Input() currentGameList: IGame[] = [];
    
	@Output() currentGameListChange: EventEmitter<IGame[]> = new EventEmitter<IGame[]>();
	@Output() public onChange = new EventEmitter<string>();
    
	public valueSpinner = 0;
	public searchText: IFilterListSettings['searchText'] = '';
	public isSpinner: boolean = false;
    
	private _searchTimerId: any = null;

	constructor(
		private _filterListService: FilterListService,
	) {
	}
    
	ngOnInit(): void {
		this._filterListService.filters.subscribe(filters => {
			this.currentGameListChange.emit(this._filterListService.applyFilterGameList(filters));
		});
		
		setTimeout(() => {
			this.valueSpinner = 50
		}, 4000);
	}
	
	public onSearch(event: string) {
		this.isSpinner = true;
        
		if (this._searchTimerId) {
			clearTimeout(this._searchTimerId);
			this._searchTimerId = null;
		}
        
		this.valueSpinner = 0;
		this._searchTimerId = setTimeout(() => {
			this.searchText = event.toLowerCase();
			this._changeFilter();
		}, 500);
	}
    
    public clearFilters () {
        this.searchText = '';
        this._changeFilter();
    }
	
	private _changeFilter() {
		const resultFilter: IFilterListSettings = {
			searchText: this.searchText,
		};
		
		if (this.searchText) {
			resultFilter.searchText = this.searchText;
		}
		
		this._filterListService.filters.next(resultFilter);
		this.isSpinner = false;
	}
}
