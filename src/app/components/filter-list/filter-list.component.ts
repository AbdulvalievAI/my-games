

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
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, takeUntil } from 'rxjs';

import { PlatformsService } from '../../services/api/platforms.service';
import type { IGame, IGameGroup } from '../../types/games.interfaces';
import type { IGamingAccount } from '../../types/gaming-accounts.interfaces';
import type { IPlatform } from '../../types/platforms.interfaces';
import { LogoPlatformComponent } from "../logo-platform/logo-platform.component";
import type { IFilterForm, ISortItem, TQueueFilters, TTypesFilters } from './filter-list.interface';
import { FilterListService } from './filter-list.service';

@Component({
    selector: 'app-filter-list',
    templateUrl: './filter-list.component.html',
    styleUrls: [ './filter-list.component.scss' ],
    standalone: true,
    providers: [
        FilterListService,
        PlatformsService,
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
        LogoPlatformComponent,
        MatSlideToggle
    ],
})
export class FilterComponent implements OnInit, OnDestroy {
    public readonly platformsService = inject(PlatformsService);
    public readonly filterListService = inject(FilterListService);
    private readonly _fb = inject(FormBuilder);

    @Input() gamesList: IGame[] = [];
    @Input() gameGroupsList: IGameGroup[];
    @Input() platformList: IPlatform[] = [];
    @Input() accountsList: IGamingAccount[] = [];

    @Output() gamesListChange: EventEmitter<IGame[]> = new EventEmitter<IGame[]>();

    public form: FormGroup<IFilterForm>;
    public valueSpinner = 0;
    public isSpinner = false;

    private _searchTimerId: ReturnType<typeof setTimeout> | null;
    private readonly _destroy$ = new Subject<void>();
    private _queueFilters: TQueueFilters = {};

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
            this._changeFilter('search');
        }, 500);
    }

    public clearFilters(): void {
        this.form.get('search')?.setValue(null);
        this.form.get('platform')?.setValue(null);
        this.form.get('group')?.setValue(null);
        this.form.get('account')?.setValue(null);
        this.form.get('sort')?.setValue(this.filterListService.defaultSort);
        this.form.get('completed')?.setValue(false);

        this._changeFilter();
    }

    public get selectedPlatformValue(): IPlatform | null | undefined {
        return this.form.value.platform;
    }

    private _initFilter(): void {
        this.filterListService.initialize(this.gamesList);
        this._initForm();

        this.filterListService.filters$
            .subscribe(filters => {
                this.gamesListChange.emit(this.filterListService.applyFilterGamesList(filters));
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
            account: new FormControl<IGamingAccount | null>(null),
            sort: new FormControl<ISortItem>(this.filterListService.defaultSort),
            completed: new FormControl<boolean>(false),
        });

        this.form.get('search')?.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => this.onSearch());

        this.form.get('platform')?.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
                this._changeFilter('platform');
            });

        this.form.get('group')?.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
                this._changeFilter('group');
            });

        this.form.get('account')?.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
                this._changeFilter('account');
            });

        this.form.get('sort')?.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
                this._changeFilter('sort');
            });

        this.form.get('completed')?.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
                this._changeFilter('completed');
            });
    }

    private _changeFilter(keyFilter?: TTypesFilters): void {
        const formValue = this.form.getRawValue();
        const queue = new Date().getTime();

        switch (keyFilter) {
            case 'search': {
                const value = formValue[keyFilter];

                if (value) {
                    this._queueFilters[keyFilter] = { queue, value };
                } else {
                    delete this._queueFilters[keyFilter];
                }
                break;
            }
            case 'platform': {
                const value = formValue[keyFilter];

                if (value) {
                    this._queueFilters[keyFilter] = { queue, value };
                } else {
                    delete this._queueFilters[keyFilter];
                }
                break;
            }
            case 'group': {
                const value = formValue[keyFilter];

                if (value) {
                    this._queueFilters[keyFilter] = { queue, value };
                } else {
                    delete this._queueFilters[keyFilter];
                }
                break;
            }
            case 'account': {
                const value = formValue[keyFilter];

                if (value) {
                    this._queueFilters[keyFilter] = { queue, value };
                } else {
                    delete this._queueFilters[keyFilter];
                }
                break;
            }
            case 'sort': {
                const value = formValue[keyFilter];

                if (value) {
                    this._queueFilters[keyFilter] = { queue, value };
                } else {
                    delete this._queueFilters[keyFilter];
                }
                break;
            }
            case 'completed': {
                const value = formValue[keyFilter];

                if (value) {
                    this._queueFilters[keyFilter] = { queue, value };
                } else {
                    delete this._queueFilters[keyFilter];
                }
                break;
            }
            default: {
                this._queueFilters = {};
                break;
            }
        }

        this.filterListService.filters$
            .next(this._queueFilters);

        this.isSpinner = false;
    }
}
