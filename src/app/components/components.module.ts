import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser'

import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

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
    ],
    exports: [
        GameCardComponent,
        GamesListComponent,
        FilterComponent,
    ],
})
export class ComponentsModule { }
