import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser'

import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

import { GameCardComponent } from './game-card/game-card.component';
import { GamesListComponent } from './games-list/games-list.component';
import { FilterComponent } from './filter-list/filter-list.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { YesNoDialogComponent } from './yes-no-dialog/yes-no-dialog.component';

@NgModule({
    declarations: [
        GameCardComponent,
        GamesListComponent,
        FilterComponent,
        ImageDialogComponent,
        YesNoDialogComponent,
    ],
    imports: [
        BrowserModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        MatListModule,
        MatProgressSpinnerModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatTooltipModule,
    ],
    exports: [
        GameCardComponent,
        GamesListComponent,
        FilterComponent,
    ],
})
export class ComponentsModule { }
