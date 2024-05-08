import { ChangeDetectorRef, Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
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
        private router: Router,
        private dataService: DataService,
    ) {
    }

    ngOnInit(): void {
        console.log('===> HomeComponent', this);
    }
    
    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }
    
    public goToAddGame() {
        this.router.navigate(['/game']);
    }
    
    public copyGamesList() {
        navigator.clipboard.writeText(JSON.stringify(this.dataService.getGamesLC(), null, 2));
    }
    
    public copyGamesListFile() {
        const element = document.createElement('a');
        
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.dataService.getGamesLC(), null, 2)));
        element.setAttribute('download', 'GamesList.json');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
}