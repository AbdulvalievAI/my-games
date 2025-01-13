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
import { MatMenuModule } from '@angular/material/menu';

import { ComponentsModule } from "../components/components.module";
import { GamesService } from '../data/games/games.service';
import { PlatformsService } from '../data/platforms/platforms.service';

import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthComponent } from './auth/auth.component';
import { YandexTokenComponent } from './auth/yandexToken/yandex-token.component';

@NgModule({
    declarations: [
        HomeComponent,
        GameComponent,
        SettingsComponent,
        AuthComponent,
        YandexTokenComponent,
    ],
    exports: [
        HomeComponent,
        GameComponent,
        SettingsComponent,
        AuthComponent,
        YandexTokenComponent,
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
        MatMenuModule,
    ],
    providers: [
        GamesService,
        PlatformsService,
    ],
})
export class PagesModule { }
