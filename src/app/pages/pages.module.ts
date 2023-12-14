import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { SettingsComponent } from './settings/settings.component';

import { ComponentsModule } from "../components/components.module";

@NgModule({
    declarations: [
        HomeComponent,
        GameComponent,
        EditGameComponent,
        SettingsComponent,
    ],
    exports: [
        HomeComponent,
        GameComponent,
        EditGameComponent,
        SettingsComponent,
    ],
    imports: [
        ComponentsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        NoopAnimationsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatDialogModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatDividerModule,
    ],
})
export class PagesModule { }
