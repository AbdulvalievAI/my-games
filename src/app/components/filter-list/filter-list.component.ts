import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGame } from 'src/app/interfaces/game.interface';
import { IFilterListSettings } from './filter-list.component.interface';
import { FilterListService } from './filter-list.service';

@Component({
  selector: 'filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss']
})
export class FilterComponent implements OnInit {
	@Input() currentGameList: IGame[] = [];
	@Output() currentGameListChange: EventEmitter<IGame[]> = new EventEmitter<IGame[]>();
	
	@Output() public onChange = new EventEmitter<string>();
	public valueSpinner = 0;
	public searchText: IFilterListSettings['searchText'] = '';
	private searchTimerId: any = null;
	public isSpinner: boolean = false;

	constructor(
		private filterListService: FilterListService,
	) {
		
	}
    
	ngOnInit(): void {
		console.log('===> filter-list.component > this', this);
		this.filterListService.filters.subscribe(filters => {
			this.currentGameListChange.emit(this.filterListService.applyFilterGameList(filters));
		});
		
		setTimeout(() => {
			this.valueSpinner = 50
		}, 4000);
	}
	
	public onSearch(event: string) {
		this.isSpinner = true;
		if (this.searchTimerId) {
			clearTimeout(this.searchTimerId);
			this.searchTimerId = null;
		}
		this.valueSpinner = 0;
		
		this.searchTimerId = setTimeout(() => {
			this.searchText = event;
			this.changeFilter();
		}, 500);
	}
	
	private changeFilter() {
		const resultFilter: IFilterListSettings = {
			searchText: this.searchText,
		};
		
		if (this.searchText) {
			resultFilter.searchText = this.searchText;
		}
		
		this.filterListService.filters.next(resultFilter);
		
		this.isSpinner = false;
	}
    
    public clearFilters () {
        this.searchText = '';
        this.changeFilter();
    }
}
