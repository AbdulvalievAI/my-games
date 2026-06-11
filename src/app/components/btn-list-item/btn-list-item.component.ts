import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import type { IBtnConfig, IBtnListItem } from './btn-list-item.interface';

@Component({
    selector: 'app-btn-list-item',
    templateUrl: './btn-list-item.component.html',
    styleUrls: [ './btn-list-item.component.scss' ],
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
    ],
})
export class BtnListItemComponent<T extends IBtnListItem> {
    @Input() buttonData: T;
    @Input() btnConfig: IBtnConfig;
    @Input() disabled = false;

    @Output() clickItem = new EventEmitter<T>();
    @Output() clickBtn = new EventEmitter<T>();
}
