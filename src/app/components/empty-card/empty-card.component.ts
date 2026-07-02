import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCard, MatCardContent,MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
    selector: 'app-empty-card',
    templateUrl: './empty-card.component.html',
    styleUrls: [ './empty-card.component.scss' ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        MatCardHeader,
        MatCard,
        MatCardTitle,
        MatCardContent
    ],
})
export class EmptyCardComponent {
}
