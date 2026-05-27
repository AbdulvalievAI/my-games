import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

import type { IBtnConfig, IBtnListItem } from './btn-list.interface';

@Component({
    selector: 'app-btn-list',
    templateUrl: './btn-list.component.html',
    styleUrls: [ './btn-list.component.scss' ],
    standalone: true,
    imports: [
        MatListModule,
        ScrollingModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
    ],
})
export class BtnListComponent {
    @Input() buttonsList: IBtnListItem[] | null | undefined = [];
    @Input() orientation: 'horizontal' | 'vertical' = 'vertical';
    @Input() btnConfig: IBtnConfig;
    @Input() disabled = false;

    @Output() clickItem = new EventEmitter<IBtnListItem>();
    @Output() clickBtn = new EventEmitter<IBtnListItem>();
}
