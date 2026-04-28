import { Injectable } from '@angular/core';
import cloneDeep from 'lodash-es/cloneDeep';
import { BehaviorSubject } from 'rxjs';

import { gamesList } from '../data/mocks';
import { EPlatform } from "../data/platforms.data";
import type { IGame } from '../types/games.interfaces';
import {
    type IPlatform,
} from '../types/platforms.interfaces';

@Injectable({
    providedIn: 'root'
})
export class GamesService {
    public changeGames$: BehaviorSubject<IGame[]>;
    public platformsObject: Partial<Record<EPlatform, IPlatform>> = {};

    private readonly _keyLocalStorage = 'games';

    constructor(
    ) {
        this.changeGames$ = new BehaviorSubject(this.getGamesLC());
    }

    public get games(): IGame[] {
        return cloneDeep(gamesList)
    }

    public get mockGame(): IGame {
        return {
            id: 'ERROR',
            name: 'Что то пошло не так \\(О-О)/',
            logo: '/assets/omg.jpg',
            platforms: [ EPlatform.STEAM ],
            dateEdit: '2023-12-12T13:42:08.914Z',
        };
    }

    public saveGame(game: IGame): void {
        if (game) {
            const games = this.getGamesLC();

            games.push(game);
            localStorage.setItem(this._keyLocalStorage, JSON.stringify(games));
            this.changeGames$.next(games);
        }
    }

    public deleteGame(game: IGame): void {
        const games = this.getGamesLC();

        const gameIdx: number = ((): number => {
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
        const games: string | null = localStorage.getItem(this._keyLocalStorage);

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
            localStorage.setItem(this._keyLocalStorage, JSON.stringify(games));
            this.changeGames$.next(games);
        }
    }

    public setGamesLC(games: IGame[]): void {
        if (games && games.length) {
            localStorage.setItem(this._keyLocalStorage, JSON.stringify(games));
        }
    }

    public editGameCL(game: IGame): void {
        const games = this.getGamesLC();

        const gameIdx: number = ((): number => {
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

    public getGameById(id: IGame['id']): IGame | undefined {
        return this.getGamesLC().find(item => item.id === id);
    }
}
