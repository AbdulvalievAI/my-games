import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatTooltipModule } from '@angular/material/tooltip';

import { EPlatformLogo } from "../../data/platforms.data";
import type { IPlatform } from "../../types/platforms.interfaces";

@Component({
    selector: 'app-logo-platform',
    templateUrl: './logo-platform.component.html',
    styleUrls: [ './logo-platform.component.scss' ],
    standalone: true,
    imports: [
        CommonModule,
        MatTooltipModule
    ],

})
export class LogoPlatformComponent {
    @Input() data: IPlatform | null | undefined;
    @Input() width = '30px';

    public EPlatformLogo = EPlatformLogo;
}
