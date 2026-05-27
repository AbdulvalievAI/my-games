import type {
    DebugElement,
    Type,
} from "@angular/core";
import {
    type ComponentFixture,
    TestBed,
} from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import type { IAnyObject } from "../types/common.interfaces";

export const getComponentStable = async <T>(component: Type<T>): Promise<ComponentFixture<T>> => {
    const createdComponent = TestBed.createComponent<T>(component);

    await createdComponent.whenStable();

    return createdComponent;
};

export const getComponentInstance = <T>(component: Type<T>): T => {
    const createdComponent = TestBed.createComponent(component);

    return createdComponent.componentInstance;
};

export const getComponentHTML = async <T>(component: Type<T>): Promise<HTMLElement> => {
    const createdComponent = await getComponentStable(component);

    return createdComponent.nativeElement as HTMLElement;
};

export const setComponentInputs = <T>(component: ComponentFixture<T>, data: IAnyObject): void => {
    if (!data || !Object.keys(data).length) {
        throw new Error(`func "setComponentInputs" param "data" is ${typeof data}`)
    }

    Object.keys(data)
        .forEach(key => {
            component.componentRef.setInput(key, data[key]);
        });

    component.detectChanges();
};

export const getDebugElementByCss = <T>(fixture: ComponentFixture<T>, queryText: string): DebugElement => {
    return fixture.debugElement.query(By.css(queryText));
};
