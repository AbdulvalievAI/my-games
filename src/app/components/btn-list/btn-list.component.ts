import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

import type { IBtnConfig, IBtnListItem } from './btn-list.interface';

@Component({
    selector: 'app-btn-list',
    templateUrl: './btn-list.component.html',
    styleUrls: [ './btn-list.component.scss' ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        MatListModule,
        MatIcon,
        MatButtonModule,
        MatTooltipModule
    ],
})
export class BtnListComponent<T extends IBtnListItem> {
    @Input() buttonsList: T[] | null | undefined = [];
    @Input() orientation: 'horizontal' | 'vertical' = 'vertical';
    @Input() btnConfig: IBtnConfig;
    @Input() disabled = false;

    @Output() clickItem = new EventEmitter<T>();
    @Output() clickBtn = new EventEmitter<T>();
}
