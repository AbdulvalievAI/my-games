import { ChangeDetectorRef, Component, OnInit, AfterViewInit } from '@angular/core';
import { IGame } from 'src/app/interfaces/game.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
    public currentGameList: IGame[] = [];

    constructor(
        private cdr: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        console.log('===> HomeComponent', this);
    }
    
    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }
}