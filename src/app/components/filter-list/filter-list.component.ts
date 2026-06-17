

import {
    Component,
    EventEmitter,
    inject,
    Input,
    type OnDestroy,
    type OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, FormControl, type FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, takeUntil } from 'rxjs';

import type { IGame, IGameGroup } from '../../types/games.interfaces';
import type { IPlatform } from '../../types/platforms.interfaces';
import { LogoPlatformComponent } from "../logo-platform/logo-platform.component";
import type { IFilterForm, IFilters } from './filter-list.interface';
import { FilterListService } from './filter-list.service';

@Component({
    selector: 'app-filter-list',
    templateUrl: './filter-list.component.html',
    styleUrls: [ './filter-list.component.scss' ],
    standalone: true,
    providers: [
        FilterListService,
    ],
    imports: [
        MatFormFieldModule,
        MatIconModule,
        MatProgressSpinnerModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatTooltipModule,
        MatSelectModule,
        ReactiveFormsModule,
        LogoPlatformComponent
    ],
})
export class FilterComponent implements OnInit, OnDestroy {
    private readonly _filterListService = inject(FilterListService);
    private readonly _fb = inject(FormBuilder);

    @Input() gamesList: IGame[] = [];
    @Input() gameGroupsList: IGameGroup[];
    @Input() platformList: IPlatform[] = [];

    @Output() gamesListChange: EventEmitter<IGame[]> = new EventEmitter<IGame[]>();

    public form: FormGroup<IFilterForm>;
    public valueSpinner = 0;
    public isSpinner = false;

    private _searchTimerId: ReturnType<typeof setTimeout> | null;
    private readonly _destroy$ = new Subject<void>();

    ngOnInit(): void {
        this._initFilter();
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();

        if (this._searchTimerId) {
            clearTimeout(this._searchTimerId);
        }
    }

    public onSearch(): void {
        this.isSpinner = true;

        if (this._searchTimerId) {
            clearTimeout(this._searchTimerId);
            this._searchTimerId = null;
        }

        this.valueSpinner = 0;
        this._searchTimerId = setTimeout(() => {
            this._changeFilter();
        }, 500);
    }

    public clearFilters(): void {
        this.form.get('search')?.setValue(null);
        this.form.get('platform')?.setValue(null);
        this.form.get('group')?.setValue(null);

        this._changeFilter();
    }

    public get selectedPlatformValue(): IPlatform | null | undefined {
        return this.form.value.platform;
    }

    private _initFilter(): void {
        this._filterListService.initialize(this.gamesList);
        this._initForm();

        this._filterListService.filters$
            .subscribe(filters => {
                this.gamesListChange.emit(this._filterListService.applyFilterGamesList(filters));
            });

        setTimeout(() => {
            this.valueSpinner = 50
        }, 4000);
    }

    private _initForm(): void {
        this.form = this._fb.group({
            search: new FormControl<string | null>(null),
            platform: new FormControl<IPlatform | null>(null),
            group: new FormControl<IGameGroup | null>(null),
        });

        this.form.get('search')?.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => this.onSearch());

        this.form.get('platform')?.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
                this._changeFilter();
            });

        this.form.get('group')?.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
                this._changeFilter();
            });
    }

    private _changeFilter(): void {
        const formValue = this.form.getRawValue();
        const filters: IFilters = {};

        if (formValue.search) {
            filters.search = formValue.search.toLocaleLowerCase();
        }

        if (formValue.platform) {
            filters.platform = { ...formValue.platform };
        }

        if (formValue.group) {
            filters.group = { ...formValue.group };
        }

        this._filterListService.filters$
            .next(filters);

        this.isSpinner = false;
    }
}
