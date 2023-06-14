import { IGame } from './interfaces/game.interface';
import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public filterSettings: IFilterSettings = {
        searchText: '',
    };
    public currentGameList: IGame[] = [];
    private defaultGameList: IGame[] = [];
    private timerId: any = null;

    constructor(
        private dataService: DataService,
    ) {
      
    }
    
    ngOnInit(): void {
        this.defaultGameList = this.dataService.games;
        this.currentGameList = this.dataService.games;
    }
    
    public onSearch(event: string) {
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
        
        this.timerId = setTimeout(() => {
            this.filterSettings.searchText = event;
            console.log('===> app.component > this.filterSettings', this.filterSettings);
            this.applyFilterGameList();
        }, 500);
    }
    
    private applyFilterGameList() {
        let resultGameList: IGame[] = this.defaultGameList;
        
        if (this.filterSettings.searchText) {
            resultGameList = resultGameList.filter(game => game.name.includes(this.filterSettings.searchText));
        }
        
        this.currentGameList = resultGameList;
    }
}

interface IFilterSettings {
    searchText: string;
}
