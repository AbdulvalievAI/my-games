import {
    type AfterViewInit,
    ChangeDetectorRef,
    Component,
    inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

import { FilterComponent } from '../../components/filter-list/filter-list.component';
import { GamesListComponent } from '../../components/games-list/games-list.component';
import { HeaderComponent } from "../../components/header/header.component";
import { SettingsComponent } from "../../components/settings/settings.component";
import type { IGame } from '../../types/games.interfaces';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ],
    standalone: true,
    imports: [
        FilterComponent,
        GamesListComponent,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        SettingsComponent,
        HeaderComponent,
    ],
})
export class HomeComponent implements AfterViewInit {
    private readonly _cdr = inject(ChangeDetectorRef);
    private readonly _router = inject(Router);

    public currentGameList: IGame[] = [];

    public ngAfterViewInit(): void {
        this._cdr.detectChanges();
    }

    public goToAddGame(): void {
        this._router.navigate([ '/game' ]);
    }
}