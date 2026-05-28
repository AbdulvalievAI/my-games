import type { DebugElement } from "@angular/core";
import {
    type ComponentFixture,
    TestBed,
} from "@angular/core/testing";
import {
    beforeEach,
    describe,
    expect,
    it,
} from "vitest";

import {
    getComponentInstance,
    getDebugElementByCss,
} from "../../test-tools/test-tools";
import { SettingsComponent } from "./settings.component";

const openMenu = (fixture: ComponentFixture<SettingsComponent>, element: DebugElement): void => {
    element.triggerEventHandler('click', null);
    fixture.detectChanges();
};

describe('component "app-settings"', async () => {
    await TestBed.configureTestingModule({
        imports: [
            SettingsComponent,
        ],
    }).compileComponents();

    it('component create, created', () => {
        const createdComponent = getComponentInstance(SettingsComponent);

        expect(createdComponent).toBeTruthy();
    });

    describe('buttons exists', () => {
        let fixture: ComponentFixture<SettingsComponent>;
        let settingsButton: DebugElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(SettingsComponent);
            fixture.detectChanges();

            settingsButton = getDebugElementByCss(fixture, 'button[aria-label="Настройки"]');
        });

        it('button "Настройки" exists', () => {
            expect(settingsButton).toBeTruthy();
        });

        it('button "Данные" exists', () => {
            openMenu(fixture, settingsButton);

            const copyGamesListButton = getDebugElementByCss(fixture, 'button[aria-label="Данные"]');

            expect(copyGamesListButton).toBeTruthy();
        });
    });
});