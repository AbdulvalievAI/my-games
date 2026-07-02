import { CommonModule } from "@angular/common";
import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
    selector: 'app-load-block',
    templateUrl: './load-block.component.html',
    styleUrls: [ './load-block.component.scss' ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        MatProgressSpinner,
    ],
})
export class LoadBlockComponent {
    @Input() text = '';
}
