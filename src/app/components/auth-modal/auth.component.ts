/* import {
    Component,
    type OnInit,
} from '@angular/core';
import type { IAnyObject } from 'src/app/types/common.interfaces';

import { CoreModulePathsConfig } from '../../config/yandex.config';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: [ './auth.component.scss' ],
    standalone: true
})
export class AuthComponent implements OnInit {
    ngOnInit(): void {
        const oauthQueryParams = {
            client_id: CoreModulePathsConfig.clientId,
            response_type: 'token',
            redirect_uri: CoreModulePathsConfig.redirectUri,
        };
        const myWindow: Window = window;
        const yaAuthSuggest: IAnyObject = myWindow.YaAuthSuggest;

        yaAuthSuggest.init(
            oauthQueryParams,
            CoreModulePathsConfig.tokenPageOrigin,
            {
                view: "button",
                parentId: "buttonContainerId",
                buttonSize: 'm',
                buttonView: 'main',
                buttonTheme: 'light',
                buttonBorderRadius: "6",
                buttonIcon: 'ya',
            }
        )
        .then((result: unknown) => result.handler())
        .then((data: unknown) => console.log('Сообщение с токеном', data))
        .catch((error: unknown) => console.error(error));
    }
} */