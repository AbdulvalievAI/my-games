import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from "vitest";

import { AppComponent } from './app.component';
import {
    getComponentHTML,
    getComponentInstance,
} from './test-tools/test-tools';

describe('component "app-root"', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AppComponent,
            ],
        }).compileComponents();
    });

    it('component create, created', () => {
        const appComponent = getComponentInstance(AppComponent);

        expect(appComponent).toBeTruthy();
    });

    it('html element "router-outlet", exists', async () => {
        const html = await getComponentHTML(AppComponent);

        expect(html.querySelector('router-outlet')).toBeTruthy();
    });
});
