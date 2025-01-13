import { ChangeDetectorRef, Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { IGame } from '../../data/games/games.interfaces';
import { GamesService } from '../../data/games/games.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
    public currentGameList: IGame[] = [];

    constructor(
        private _cdr: ChangeDetectorRef,
        private _router: Router,
        private _gamesService: GamesService,
    ) {
    }

    ngAfterViewInit(): void {
        this._cdr.detectChanges();
    }
    
    public goToAddGame() {
        this._router.navigate(['/game']);
    }
    
    public copyGamesList() {
        navigator.clipboard.writeText(JSON.stringify(this._gamesService.getGamesLC(), null, 2));
    }
    
    public copyGamesListFile() {
        const element = document.createElement('a');
        
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this._gamesService.getGamesLC(), null, 2)));
        element.setAttribute('download', `GamesList_${new Date().getTime()}.json`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
}