import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { GameCardComponent } from './game-card/game-card.component';
import { GamesListComponent } from './games-list/games-list.component';
import { FilterComponent } from './filter-list/filter-list.component';

@NgModule({
  declarations: [
    GameCardComponent,
    GamesListComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  exports: [
    GameCardComponent,
    GamesListComponent,
    FilterComponent,
  ],
})
export class ComponentsModule { }
