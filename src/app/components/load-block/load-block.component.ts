import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
    selector: 'app-load-block',
    templateUrl: './load-block.component.html',
    styleUrls: [ './load-block.component.scss' ],
    standalone: true,
    imports: [
        CommonModule,
        MatProgressSpinner,
    ],
})
export class LoadBlockComponent {
    @Input() text = '';
}
