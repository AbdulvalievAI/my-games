import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-empty-card',
    templateUrl: './empty-card.component.html',
    styleUrls: [ './empty-card.component.scss' ],
    standalone: true,
    imports: [
        MatCardModule,
    ],
})
export class EmptyCardComponent {
}
