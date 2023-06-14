import { Component, Input } from '@angular/core';
import { IGame } from '../interfaces/game.interface';
import { DataService } from '../services/data.service';

@Component({
  selector: 'game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
  @Input() gameData: IGame = this.dataService.mockGame;
  @Input() index: number = 0;
  
  constructor (
    private dataService : DataService
  ) {
    
  }
}
