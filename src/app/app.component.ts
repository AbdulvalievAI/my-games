import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThemeService } from './services/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
    standalone: true,
    imports: [ CommonModule, RouterModule ]
})
export class AppComponent implements OnInit {
    public readonly themeService = inject(ThemeService);

    ngOnInit(): void {
        this.themeService.initializeTheme();
    }
}
