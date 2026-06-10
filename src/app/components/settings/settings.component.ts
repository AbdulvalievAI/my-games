import { Component, EventEmitter, inject,type OnDestroy,Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, takeUntil } from 'rxjs';

import { DialogService } from '../../services/dialog.service';
import { ExplorerService } from '../../services/explorer.service';
import type { TActionSettings } from './settings.interface';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: [ './settings.component.scss' ],
    standalone: true,
    providers: [
        DialogService,
        ExplorerService,
    ],
    imports: [
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
    ],
})
export class SettingsComponent implements OnDestroy {
    public readonly explorerService = inject(ExplorerService);
    public readonly dialogService = inject(DialogService);

    @Output() action: EventEmitter<TActionSettings> = new EventEmitter<TActionSettings>();

    private readonly _destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public openAuthDialog() {
        const dialogRef = this.dialogService.openAuthDialog();

        dialogRef.afterClosed()
            .pipe(
                takeUntil(this._destroy$),
            )
            .subscribe(action => {
                if (action === 'syncData') {
                    this.action.emit(action)
                }
            });
    }
}
