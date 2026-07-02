import { ScrollingModule } from '@angular/cdk/scrolling';
import {
    ChangeDetectorRef,
    Component,
    inject,
    type OnDestroy,
    type OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { catchError, EMPTY,Subject,takeUntil } from 'rxjs';

import { EmptyCardComponent } from '../../components/empty-card/empty-card.component';
import { HeaderComponent } from "../../components/header/header.component";
import { GameGroupsService } from '../../services/api/game-groups.service';
import { DialogService } from '../../services/dialog.service';
import { ExplorerService } from '../../services/explorer.service';
import type { IGameGroup } from '../../types/games.interfaces';

@Component({
    selector: 'app-game-groups-list',
    templateUrl: './game-groups-list.component.html',
    styleUrls: [ './game-groups-list.component.scss' ],
    standalone: true,
    providers: [
        DialogService,
        ExplorerService,
        GameGroupsService,
    ],
    imports: [
        MatListModule,
        ScrollingModule,
        EmptyCardComponent,
        MatProgressSpinnerModule,
        MatIconModule,
        HeaderComponent,
        MatButtonModule,
        MatTooltipModule,
    ],
})
export class GameGroupsListComponent implements OnInit, OnDestroy {
    public readonly explorerService = inject(ExplorerService);
    private readonly _gameGroupsService = inject(GameGroupsService);
    private readonly _dialogService = inject(DialogService);
    private readonly _cdr = inject(ChangeDetectorRef);

    private readonly _destroy$ = new Subject<void>();

    public gameGroupsList: IGameGroup[] = [];
    public isLoad = true;

    ngOnInit(): void {
        this._gameGroupsService.getGameGroups()
            .pipe(
                takeUntil(this._destroy$),
                catchError(error => {
                    console.error(error);
                    this._dialogService.openErrorDialog(error);
                    this.isLoad = false;

                    return EMPTY;
                }),
            )
            .subscribe(gameGroups => {
                this.gameGroupsList = gameGroups;
                this.isLoad = false;
                this._cdr.detectChanges();
            });
    }


    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public trackByGameGroup(index: number, gameGroup: IGameGroup): string {
        return gameGroup.id;
    }
}
