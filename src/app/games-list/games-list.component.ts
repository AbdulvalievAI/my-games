import { IGame } from './../interfaces/game.interface';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent implements OnInit {
    @Input() gameList: IGame[] = [];

    ngOnInit(): void {
        
    }
}

