import { Component, inject, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";

import type { EPlatform } from "../../data/platforms";
import { ExplorerService } from "../../services/explorer.service";
import type { IGame, IGameGroup } from "../../types/games.interfaces";
import type { IGamingAccount } from "../../types/gaming-accounts.interfaces";
import type { IPlatform } from "../../types/platforms.interfaces";
import { EmptyLogoComponent } from "../empty-logo/empty-logo.component";
import { LogoPlatformComponent } from "../logo-platform/logo-platform.component";

@Component({
    selector: 'app-game-item',
    templateUrl: './game-item.component.html',
    styleUrls: [ './game-item.component.scss' ],
    standalone: true,
    providers: [
        ExplorerService,
    ],
    imports: [
        LogoPlatformComponent,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        EmptyLogoComponent,
    ],
})
export class GameItemComponent {
    public readonly explorerService = inject(ExplorerService);
    private readonly _snackBar = inject(MatSnackBar);

    @Input() gameData: IGame;
    @Input() mapGameGroups: Map<string, IGameGroup>;
    @Input() mapPlatforms: Map<EPlatform, IPlatform>;
    @Input() mapAccounts: Map<string, IGamingAccount>;

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
