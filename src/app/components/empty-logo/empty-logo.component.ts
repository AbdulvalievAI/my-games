import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-empty-logo',
    templateUrl: './empty-logo.component.html',
    styleUrls: [ './empty-logo.component.scss' ],
    standalone: true,
})
export class EmptyLogoComponent {
    @Input() textSize = '50px';
}
