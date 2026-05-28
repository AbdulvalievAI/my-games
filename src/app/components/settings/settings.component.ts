import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DialogService } from '../../services/dialog.service';
import { ExplorerService } from '../../services/explorer.service';
import { FileService } from '../../services/file.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: [ './settings.component.scss' ],
    standalone: true,
    providers: [
        DialogService,
        ExplorerService,
        FileService,
    ],
    imports: [
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
    ],
})
export class SettingsComponent {
    public readonly explorerService = inject(ExplorerService);
    public readonly dialogService = inject(DialogService);
}
