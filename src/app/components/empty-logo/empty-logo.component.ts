import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: 'app-empty-logo',
    templateUrl: './empty-logo.component.html',
    styleUrls: [ './empty-logo.component.scss' ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: true,
})
export class EmptyLogoComponent {
    @Input() textSize = '50px';
}
