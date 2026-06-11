import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { BtnListItemComponent } from "../btn-list-item/btn-list-item.component";
import type { IBtnConfig,IBtnListItem } from '../btn-list-item/btn-list-item.interface';

@Component({
    selector: 'app-btn-list',
    templateUrl: './btn-list.component.html',
    styleUrls: [ './btn-list.component.scss' ],
    standalone: true,
    imports: [
        MatListModule,
        BtnListItemComponent,
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
