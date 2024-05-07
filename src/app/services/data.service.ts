import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IPlatform } from '../interfaces/platform.interface';
import { IGame } from '../interfaces/game.interface';
import { EPlatform } from '../enums/platform.enums';
import { gamesList } from '../data/games';
import { platformsList } from '../data/platforms';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    private readonly keyLocalStorage = 'games';
    
    public changeGames$: BehaviorSubject<IGame[]>;
    
    public platformsObject: {[key in EPlatform]?: IPlatform} = {};

    constructor() {
        const games = this.getGamesLC();
        
        platformsList.forEach(item => {
            this.platformsObject[item.type] = item;
        });
        
        this.changeGames$ = new BehaviorSubject(games);
    
        const nowGOG = [
            "INDUSTRIA",
            "Dakar Desert Rally",
            "Sail Forth",
            "GigaBash",
            "Predecessor",
            "Tandem: A Tale of Shadows",
            "Blazing Sails",
            "GRIME",
            "The Dungeon of Naheulbeuk",
            "PAYDAY 2",
            "Midnight Ghost Hunt",
            "Коллекция «The Sims™ 4 Жажда приключений»",
            "Breathedge",
            "Beyond Blue",
            "Never Alone (Kisima Ingitchuna)",
            "Call of the Sea",
            "Dishonored®: Death of the Outsider™",
            "Dishonored®: Death of the Outsider™",
            "Hell is Others",
            "Adios",
            "Severed Steel",
            "F.I.S.T.: Forged In Shadow Torch",
            "DEATH STRANDING",
            "Rise of the Tomb Raider: 20 Year Celebration",
            "Shadow of the Tomb Raider: Definitive Edition",
            "Tomb Raider GAME OF THE YEAR EDITION",
        ];
        
        const result = nowGOG.filter(nowGame => {
            if (!gamesList.find(oldGame => nowGame.toLowerCase() === oldGame.name.toLowerCase())) {
                return true;
            } else {
                return false;
            }
        });
        
        console.log('===> data.service > result', JSON.stringify(result, null, 4));
        
    }
    
    public get games(): IGame[] {
        return JSON.parse(JSON.stringify(gamesList)) as IGame[];
    }

    public get platforms(): IPlatform[] {
        return JSON.parse(JSON.stringify(platformsList)) as IPlatform[];
    }

    public get mockGame(): IGame {
        return {
            'id': -1,
            'name': 'Что то пошло не так \\(О-О)/',
            'logo': '/assets/omg.jpg',
            'platforms': [EPlatform.STEAM],
            dateEdit: '2023-12-12T13:42:08.914Z',
        };
    }
    
    public saveGame(game: IGame): void {
        if (game) {
            const games = this.getGamesLC();
            
            games.push(game);
            localStorage.setItem(this.keyLocalStorage, JSON.stringify(games));
            this.changeGames$.next(games);
        }
    }
    
    public deleteGame(game: IGame): void {
        const games = this.getGamesLC();
        
        const gameIdx: number = (() => {
            let idx = -1;
            
            games.find((item, i) => {
                if (item.id === game.id) {
                    idx = i;
                    
                    return true;
                }
                
                return false;
            });
            
            return idx;
        })();
        
        if (gameIdx !== -1) {
            games.splice(gameIdx, 1);
            this.setGamesLC(games);
            this.changeGames$.next(games);
        }
    }
    
    public getGamesLC(): IGame[] {
        const games: string = localStorage.getItem(this.keyLocalStorage) as string;
        
        if (games) {
            return JSON.parse(games) as IGame[];
        } else {
            return gamesList;
        }
    }
    
    public setGameLC(game: IGame): void {
        if (game) {
            const games = this.getGamesLC();
            
            games.push(game);
            localStorage.setItem(this.keyLocalStorage, JSON.stringify(games));
            this.changeGames$.next(games);
        }
    }
    
    public setGamesLC(games: IGame[]): void {
        if (games && games.length) {
            localStorage.setItem(this.keyLocalStorage, JSON.stringify(games));
        }
    }
    
    public editGameCL(game: IGame): void {
        const games = this.getGamesLC();
        
        const gameIdx: number = (() => {
            let idx = -1;
            
            games.find((item, i) => {
                if (item.id === game.id) {
                    idx = i;
                    
                    return true;
                }
                
                return false;
            });
            
            return idx;
        })();
        
        if (gameIdx !== -1) {
            games[gameIdx] = game;
            
            this.setGamesLC(games);
            this.changeGames$.next(games);
        }
    }
    
    public getGameById(id: IGame['id']): IGame {
        return this.getGamesLC().find(item => item.id === id) as IGame;
    }
}
