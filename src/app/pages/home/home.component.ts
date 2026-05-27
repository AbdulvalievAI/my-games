
import {
    type AfterViewInit,
    ChangeDetectorRef,
    Component,
    inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FilterComponent } from '../../components/filter-list/filter-list.component';
import { GamesListComponent } from '../../components/games-list/games-list.component';
import { HeaderComponent } from "../../components/header/header.component";
import { SettingsComponent } from "../../components/settings/settings.component";
import { DialogService } from '../../services/dialog.service';
import { DiskService } from '../../services/disk.service';
import { ExplorerService } from '../../services/explorer.service';
import type { IGame } from '../../types/games.interfaces';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ],
    standalone: true,
    providers: [
        DialogService,
        ExplorerService,
        DiskService,
    ],
    imports: [
        FilterComponent,
        GamesListComponent,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        SettingsComponent,
        HeaderComponent,
        MatProgressSpinnerModule,
    ],
})
export class HomeComponent implements AfterViewInit {
    public dialogService = inject(DialogService);
    public explorerService = inject(ExplorerService);
    private readonly _cdr = inject(ChangeDetectorRef);
    private readonly _diskService = inject(DiskService);

    public isLoad = true;
    public currentGameList: IGame[] = [];

    public ngAfterViewInit(): void {
        this._cdr.detectChanges();
    }

    public dataLoaded(isLoad: boolean): void {
        this.isLoad = isLoad;
    }
}