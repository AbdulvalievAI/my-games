
import { AsyncPipe } from '@angular/common';
import {
    Component,
    inject,
    type OnDestroy,
    type OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BehaviorSubject, catchError, EMPTY,forkJoin, Subject, switchMap, takeUntil } from 'rxjs';

import { FilterComponent } from '../../components/filter-list/filter-list.component';
import { GamesListComponent } from '../../components/games-list/games-list.component';
import { HeaderComponent } from "../../components/header/header.component";
import { SettingsComponent } from "../../components/settings/settings.component";
import type { TActionSettings } from '../../components/settings/settings.interface';
import { DataService } from '../../services/api/data/data.service';
import { GameGroupsService } from '../../services/api/game-groups.service';
import { GamesService } from '../../services/api/games.service';
import { PlatformsService } from '../../services/api/platforms.service';
import { DialogService } from '../../services/dialog.service';
import { ExplorerService } from '../../services/explorer.service';
import type { IGame, IGameGroup } from '../../types/games.interfaces';
import type { IPlatform } from '../../types/platforms.interfaces';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ],
    standalone: true,
    providers: [
        ExplorerService,
        DialogService,
        PlatformsService,
        GameGroupsService,
    ],
    imports: [
        FilterComponent,
        MatIconModule,
        GamesListComponent,
        MatButtonModule,
        MatTooltipModule,
        SettingsComponent,
        HeaderComponent,
        MatProgressSpinnerModule,
        AsyncPipe,
    ],
})
export class HomeComponent implements OnInit, OnDestroy {
    public readonly explorerService = inject(ExplorerService);
    private readonly _dialogService = inject(DialogService);
    private readonly _gamesService = inject(GamesService);
    private readonly _platformsService = inject(PlatformsService);
    private readonly _gameGroupsService = inject(GameGroupsService);
    private readonly _dataService = inject(DataService);

    public isLoad$ = new BehaviorSubject<boolean>(true);
    public gamesList: IGame[] = [];
    public gameGroupsList: IGameGroup[] = [];
    public platformList: IPlatform[] = [];

    private readonly _destroy$ = new Subject<void>();

    ngOnInit(): void {
        this._initData();
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public actionSettings(action: TActionSettings): void {
        if (action === 'syncData') {
            this._initData();
        }
    }

    private _initData(): void {
        this.isLoad$.next(true);

        this._dataService.initData()
            .pipe(
                switchMap(() => forkJoin([
                    this._gamesService.getGames(),
                    this._gameGroupsService.getGameGroups(),
                    this._platformsService.getPlatforms(),
                ])),
                takeUntil(this._destroy$),
                catchError(error => {
                    console.error(error);
                    this._dialogService.openErrorDialog(error);

                    this.isLoad$.next(false);

                    return EMPTY;
                }),
            )
            .subscribe(([ games, gameGroups, platforms ]) => {
                this.gamesList = games;
                this.gameGroupsList = gameGroups;
                this.platformList = platforms;

                this.isLoad$.next(false);
            });
    }
}
