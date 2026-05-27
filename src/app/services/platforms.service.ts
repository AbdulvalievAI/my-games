import { Injectable } from '@angular/core';
import cloneDeep from 'lodash-es/cloneDeep';

import { type EPlatform, platformsList } from "../data/platforms.data";
import {
    type IPlatform,
} from '../types/platforms.interfaces';

@Injectable()
export class PlatformsService {
    public _platformsObject: Partial<Record<EPlatform, IPlatform>> = {};

    constructor() {
        platformsList.forEach(item => {
            this._platformsObject[item.type] = item;
        });
    }

    public get platforms(): IPlatform[] {
        return cloneDeep(platformsList);
    }

    public getPlatform(typePlatform: EPlatform): IPlatform | undefined {
        return this._platformsObject[typePlatform];
    }

    public getPlatformsByTypes(platformList: IPlatform[],ids: IPlatform['type'][]): IPlatform[] {
        return platformList.filter(item => ids.includes(item.type));
    }
}
