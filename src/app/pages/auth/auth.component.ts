import { Component, OnInit } from '@angular/core';

import { CoreModulePathsConfig } from '../../config/yandex.config';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    ngOnInit(): void {
        const oauthQueryParams = {
            client_id: CoreModulePathsConfig.clientId,
            response_type: 'token',
            redirect_uri: CoreModulePathsConfig.redirectUri,
        };
        const myWindow: any = window;
        const YaAuthSuggest: any = myWindow.YaAuthSuggest;
         
        YaAuthSuggest.init(
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
        .then((result: any) => result.handler())
        .then((data: any) => console.log('Сообщение с токеном', data))
        .catch((error: any) => console.error(error));
    }
}