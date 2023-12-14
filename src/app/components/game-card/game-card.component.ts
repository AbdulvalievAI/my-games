import { Component, Input } from '@angular/core';
import { IGame } from '../../interfaces/game.interface';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
    @Input() gameData: IGame = this.dataService.mockGame;
    @Input() index: number = 0;

    constructor (
        public dataService: DataService,
        private router: Router,
    ) {

    }
    public onClick() {
        
        this.router.navigate(['/game', this.gameData.id]);
    }
}
