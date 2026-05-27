import { TestBed } from "@angular/core/testing";
import { describe, expect, it } from "vitest";

import { platformsList } from "../../data/platforms.data";
import {
    getComponentHTML,
    getComponentInstance,
    getComponentStable,
    setComponentInputs,
} from "../../test-tools/test-tools";
import { LogoPlatformComponent } from "./logo-platform.component";

describe('component "app-logo-platform"', async () => {
    await TestBed.configureTestingModule({
        imports: [
            LogoPlatformComponent,
        ],
    }).compileComponents();

    it('component create, created', () => {
        const component = getComponentInstance(LogoPlatformComponent);

        expect(component).toBeTruthy();
    });

    describe('img default params', async () => {
        const html = await getComponentHTML(LogoPlatformComponent);
        const imgElement = html.querySelector('img');

        it('exists url', () => {
            expect(imgElement?.src).toBeTruthy();
        });

        it('exists alt', () => {
            expect(imgElement?.alt).toBeTruthy();
        });
    });

    describe('img set params', async () => {
        const component = await getComponentStable(LogoPlatformComponent);
        const html = component.nativeElement as HTMLElement;
        const testValue = platformsList[1];

        setComponentInputs(component, { data: testValue });

        const imgElement = html.querySelector('img');

        it('url equal', () => {
            expect(imgElement?.src).toContain(testValue.logo);
        });

        it('alt equal', () => {
            expect(imgElement?.alt).toContain(testValue.logo);
        });
    });
});