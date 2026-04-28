

import {
    Component,
    EventEmitter,
    inject,
    Input,
    type OnInit,
    Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import type { IGame } from '../../types/games.interfaces';
import type { IFilterListSettings } from './filter-list.component.interface';
import { FilterListService } from './filter-list.service';
@Component({
    selector: 'app-filter-list',
    templateUrl: './filter-list.component.html',
    styleUrls: [ './filter-list.component.scss' ],
    standalone: true,
    providers: [ FilterListService ],
    imports: [
        MatFormFieldModule,
        MatIconModule,
        MatProgressSpinnerModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatTooltipModule,
    ],
})
export class FilterComponent implements OnInit {
    private readonly _filterListService = inject(FilterListService);

    @Input() currentGameList: IGame[] = [];

    @Output() currentGameListChange: EventEmitter<IGame[]> = new EventEmitter<IGame[]>();
    @Output() public changeList = new EventEmitter<string>();

    public valueSpinner = 0;
    public searchText: IFilterListSettings['searchText'] = '';
    public isSpinner = false;

    private _searchTimerId: number | null = null;

    ngOnInit(): void {
        this._filterListService.filters.subscribe(filters => {
            this.currentGameListChange.emit(this._filterListService.applyFilterGameList(filters));
        });

        setTimeout(() => {
            this.valueSpinner = 50
        }, 4000);
    }

    public onSearch(event: string): void {
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

    public clearFilters(): void {
        this.searchText = '';
        this._changeFilter();
    }

    private _changeFilter(): void {
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
