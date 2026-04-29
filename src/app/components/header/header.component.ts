import { Component } from "@angular/core";
import { MatDivider } from "@angular/material/divider";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.scss' ],
    standalone: true,
    imports: [
        MatDivider,
    ],

})
export class HeaderComponent {
}
