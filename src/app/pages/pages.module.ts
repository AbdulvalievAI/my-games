import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { AddGameComponent } from './add-game/add-game.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { SettingsComponent } from './settings/settings.component';
import { ComponentsModule } from "../components/components.module";

@NgModule({
    declarations: [
        HomeComponent,
        AddGameComponent,
        EditGameComponent,
        SettingsComponent,
    ],
    exports: [
        HomeComponent,
        AddGameComponent,
        EditGameComponent,
        SettingsComponent,
    ],
    imports: [
        ComponentsModule
    ],
})
export class PagesModule { }
