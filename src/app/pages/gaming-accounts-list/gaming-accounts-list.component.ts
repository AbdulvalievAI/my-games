import { ScrollingModule } from '@angular/cdk/scrolling';
import {
    ChangeDetectionStrategy,
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
import { LogoPlatformComponent } from "../../components/logo-platform/logo-platform.component";
import { GamingAccountsService } from '../../services/api/gaming-accounts.service';
import { PlatformsService } from '../../services/api/platforms.service';
import { DialogService } from '../../services/dialog.service';
import { ExplorerService } from '../../services/explorer.service';
import type { IGamingAccount } from '../../types/gaming-accounts.interfaces';

@Component({
    selector: 'app-gaming-accounts-list',
    templateUrl: './gaming-accounts-list.component.html',
    styleUrls: [ './gaming-accounts-list.component.scss' ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DialogService,
        ExplorerService,
        PlatformsService,
        GamingAccountsService,
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
        LogoPlatformComponent
    ],
})
export class GamingAccountsListComponent implements OnInit, OnDestroy {
    public readonly explorerService = inject(ExplorerService);
    public readonly platformsService = inject(PlatformsService);
    private readonly _gamingAccountsService = inject(GamingAccountsService);
    private readonly _dialogService = inject(DialogService);
    private readonly _cdr = inject(ChangeDetectorRef);

    private readonly _destroy$ = new Subject<void>();

    public gamingAccountsList: IGamingAccount[] = [];
    public isLoad = true;

    ngOnInit(): void {
        this._gamingAccountsService.getGamingAccounts()
            .pipe(
                takeUntil(this._destroy$),
                catchError(error => {
                    console.error(error);
                    this._dialogService.openErrorDialog(error);
                    this.isLoad = false;

                    return EMPTY;
                }),
            )
            .subscribe(gamingAccounts => {
                this.gamingAccountsList = gamingAccounts;

                this.isLoad = false;
                this._cdr.detectChanges();
            });
    }


    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public trackBy(index: number, gamingAccount: IGamingAccount): string {
        return gamingAccount.id;
    }
}
