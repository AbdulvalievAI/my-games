

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
import { catchError, EMPTY, forkJoin, Subject, takeUntil } from 'rxjs';

import { DialogService } from '../../services/dialog.service';
import { GameGroupsService } from '../../services/game-groups.service';
import { GamesService } from '../../services/games.service';
import { PlatformsService } from '../../services/platforms.service';
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
        PlatformsService,
        DialogService,
        GameGroupsService,
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
    private readonly _gamesService = inject(GamesService);
    private readonly _platformsService = inject(PlatformsService);
    private readonly _filterListService = inject(FilterListService);
    private readonly _fb = inject(FormBuilder);
    private readonly _dialogService = inject(DialogService);
    private readonly _gameGroupsService = inject(GameGroupsService);

    public gameGroupsRef: IGameGroup[];

    @Input() currentGameList: IGame[] = [];

    @Output() currentGameListChange: EventEmitter<IGame[]> = new EventEmitter<IGame[]>();
    @Output() dataLoadedChange = new EventEmitter<boolean>();

    public filterForm: FormGroup<IFilterForm>;
    public valueSpinner = 0;
    public isSpinner = false;
    public platformList: IPlatform[] = [];

    private _searchTimerId: ReturnType<typeof setTimeout> | null;
    private readonly _destroy$ = new Subject<void>();

    ngOnInit(): void {
        this.dataLoadedChange.emit(true);

        forkJoin([
            this._gamesService.getGames(),
            this._gameGroupsService.getGameGroups(),
        ])
        .pipe(
            takeUntil(this._destroy$),
            catchError(error => {
                console.error(error);
                this._dialogService.openErrorDialog(error);

                return EMPTY;
            }),
        )
        .subscribe(([ games, gameGroups ]) => {
                this.currentGameList = games;

                this.gameGroupsRef = gameGroups;

                this._filterListService.initialize(this.currentGameList);
                this._initPlatformList();
                this._initForm();

                this._filterListService.filters$
                    .subscribe(filters => {
                        this.currentGameListChange.emit(this._filterListService.applyFilterGameList(filters));
                    });

                setTimeout(() => {
                    this.valueSpinner = 50
                }, 4000);

                this.dataLoadedChange.emit(false);
        });
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
        this.filterForm.get('search')?.setValue(null);
        this.filterForm.get('platform')?.setValue(null);
        this.filterForm.get('group')?.setValue(null);

        this._changeFilter();
    }

    public get selectedPlatformValue(): IPlatform | null | undefined {
        return this.filterForm.value.platform;
    }

    private _initForm(): void {
        this.filterForm = this._fb.group({
            search: new FormControl<string | null>(null),
            platform: new FormControl<IPlatform | null>(null),
            group: new FormControl<IGameGroup | null>(null),
        });

        this.filterForm.get('search')?.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => this.onSearch());

        this.filterForm.get('platform')?.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
                this._changeFilter();
            });

        this.filterForm.get('group')?.valueChanges
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
                this._changeFilter();
            });
    }

    private _changeFilter(): void {
        const formValue = this.filterForm.getRawValue();
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

    private _initPlatformList(): void {
        this.platformList = this._platformsService.platforms;
    }
}
