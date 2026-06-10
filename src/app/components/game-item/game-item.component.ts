import { Component, inject, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";

import { GamesService } from "../../services/api/games.service";
import { PlatformsService } from "../../services/api/platforms.service";
import { ExplorerService } from "../../services/explorer.service";
import type { IGame } from "../../types/games.interfaces";
import { LogoPlatformComponent } from "../logo-platform/logo-platform.component";

@Component({
    selector: 'app-game-item',
    templateUrl: './game-item.component.html',
    styleUrls: [ './game-item.component.scss' ],
    standalone: true,
    providers: [
        PlatformsService,
        ExplorerService,
    ],
    imports: [
        LogoPlatformComponent,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
    ],
})
export class GameItemComponent {
    public readonly platformsService = inject(PlatformsService);
    public readonly explorerService = inject(ExplorerService);
    private readonly _gamesService = inject(GamesService);
    private readonly _snackBar = inject(MatSnackBar);

    @Input() gameData: IGame = this._gamesService.mockGame;
    @Input() index = 0;

    public copyName(event: PointerEvent): void {
        event.stopPropagation();
        navigator.clipboard.writeText(this.gameData.name);
        this.openSnackBar('Название скопировано в буфер обмена')
    }

    public openBlank(event: PointerEvent): void {
        event.stopPropagation();
        this.explorerService.openBlankGameEdit(this.gameData.id)
    }

    public openSnackBar(message: string, action = 'OK'): void {
        this._snackBar.open(message, action, {
            duration: 200000,
            panelClass: [ 'snackbar-error' ]
        });
    }
}
