import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface ISearchParam<T> {
    field: keyof T;
    operator: string;
    value: string;
}

@Injectable({
    providedIn: 'root'
})
export class ToolsService {
    private readonly _serverDelay = 1500;

    public serverDelay<T>(callback: () => T, serverDelay?: number): Observable<T> {
        return new Observable<T>(subscriber => {
            const timer = setTimeout(() => {
                try {
                    const callbackData = callback();

                    subscriber.next(callbackData);
                    subscriber.complete();
                } catch (error) {
                    subscriber.error(error);
                }
            }, serverDelay || this._serverDelay);

            return () => clearTimeout(timer);
        });
    }

    public filterGames<T>(dataArr: T[], params: ISearchParam<T>[]): T[] {
        return dataArr.filter(item => {
            const filterResults = params.filter(paramItem => {
                if (!Object.hasOwn(item as object, paramItem.field)) {
                    return false;
                }

                switch (paramItem.operator) {
                    case 'like': {
                        const targetValue = paramItem.value;
                        const gameValue = item[paramItem.field];

                        if (typeof gameValue === 'string' && typeof targetValue === 'string') {
                            return gameValue.toLocaleLowerCase().includes(targetValue.toLocaleLowerCase());
                        } else {
                            throw new Error('Operator "like" error: invalid types');
                        }
                    }
                    case 'eq': {
                        const targetValue = paramItem.value;
                        const gameValue = item[paramItem.field];

                        if (typeof targetValue === 'string' && Array.isArray(gameValue)) {
                            return (gameValue as string[]).includes(targetValue);
                        } else {
                            throw new Error('Operator "eq" error: invalid types');
                        }
                    }
                }

                return false;
            });

            return params.length && filterResults.length === params.length;
        });
    }
}