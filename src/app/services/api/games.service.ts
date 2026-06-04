import {
    inject,
    Injectable,
    type OnDestroy,
} from '@angular/core';
import cloneDeep from 'lodash-es/cloneDeep';
import {
    type Observable,
    Subject,
    takeUntil,
} from 'rxjs';

import { EPlatform } from '../../data/platforms';
import type { IServerMessage } from '../../types/api.interfaces';
import type { IGame } from '../../types/games.interfaces';
import type { ISearchParam } from '../tools.service';
import { DataService } from './data/data.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService implements OnDestroy {
    private readonly _dataService = inject(DataService);

    private readonly _destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
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

    public createGame(game: IGame): Observable<IGame> {
        return this._dataService.createGame(game)
            .pipe(takeUntil(this._destroy$));
    }

    public getGameById(id: string): IGame | undefined {
        return this._dataService.getGameById(id);
    }

    public getGames(): Observable<IGame[]> {
        return this._dataService.getGames()
            .pipe(takeUntil(this._destroy$));
    }

    public updateGame(game: IGame): Observable<IGame> {
        return this._dataService.updateGame(game)
            .pipe(takeUntil(this._destroy$));
    }

    public deleteGame(id: string): Observable<IServerMessage> {
        return this._dataService.deleteGame(id)
            .pipe(takeUntil(this._destroy$));
    }

    public searchGamesByName(name: string): IGame[] | [] {
        const searchParams: ISearchParam<IGame>[] = [
            {
                field: 'name',
                operator: 'like',
                value: name,
            },
        ];

        return this._dataService.searchGames(searchParams);
    }

    public searchGamesByGroup(idGroup: string): IGame[] | [] {
        const searchParams: ISearchParam<IGame>[] = [
            {
                field: 'groups',
                operator: 'eq',
                value: idGroup,
            },
        ];

        return this._dataService.searchGames(searchParams);
    }

    public deleteGroupFromGame(idGame: string, idGroup: string): Observable<IGame> {
        const game = this.getGameById(idGame);

        if (!game) {
            throw new Error('Игра не найдена');
        }

        const newGame = cloneDeep(game);

        if (newGame?.groups?.length === 1) {
            delete newGame.groups;
        } else if (newGame?.groups) {
            const gameGroupIdx = newGame.groups.findIndex(id => idGroup === id);

            newGame.groups.splice(gameGroupIdx, 1);
        }

        return this.updateGame(newGame);
    }

    public addGameToGroup(idGame: string, idGroup: string): Observable<IGame> {
        const game = this.getGameById(idGame);

        if (!game) {
            throw new Error('Игра не найдена');
        }

        const newGame = cloneDeep(game);

        if (!newGame?.groups) {
            newGame.groups = [];
        }

        newGame.groups.push(idGroup)

        return this.updateGame(newGame);
    }
}


