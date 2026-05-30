import {
    inject,
    Injectable,
    type OnDestroy,
} from '@angular/core';
import cloneDeep from 'lodash-es/cloneDeep';
import {
    type Observable,
    Subject,
    switchMap,
    takeUntil,
} from 'rxjs';

import type { ISearchParam, IServerMessage } from '../../types/api.interfaces';
import type { IGame } from '../../types/games.interfaces';
import { EPlatform } from '../data/platforms';
import {
    FakeGamesApiService,
} from './fake-games-api.service';

@Injectable({
    providedIn: 'root'
})
export class GamesService implements OnDestroy {
    private readonly _fgaService = inject(FakeGamesApiService);

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
        return this._fgaService.createGame(game)
            .pipe(takeUntil(this._destroy$));
    }

    public getGameById(id: string): Observable<IGame | undefined> {
        return this._fgaService.getGameById(id)
            .pipe(takeUntil(this._destroy$));
    }

    public getGames(): Observable<IGame[]> {
        return this._fgaService.getGames()
            .pipe(takeUntil(this._destroy$));
    }

    public updateGame(game: IGame): Observable<IGame> {
        return this._fgaService.updateGame(game)
            .pipe(takeUntil(this._destroy$));
    }

    public deleteGame(id: string): Observable<IServerMessage> {
        return this._fgaService.deleteGame(id)
            .pipe(takeUntil(this._destroy$));
    }

    public searchGamesByName(name: string): Observable<IGame[] | []> {
        const searchParams: ISearchParam[] = [
            {
                field: 'name',
                operator: 'like',
                value: name,
            },
        ];

        return this._fgaService.searchGames(searchParams)
            .pipe(takeUntil(this._destroy$));
    }

    public searchGamesByGroup(idGroup: string): Observable<IGame[] | []> {
        const searchParams: ISearchParam[] = [
            {
                field: 'groups',
                operator: 'eq',
                value: idGroup,
            },
        ];

        return this._fgaService.searchGames(searchParams)
            .pipe(takeUntil(this._destroy$));
    }

    public deleteGroupFromGame(idGame: string, idGroup: string): Observable<IGame> {
        return this.getGameById(idGame)
            .pipe(
                takeUntil(this._destroy$),
                switchMap(game => {
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
                })
            );
    }

    public addGameToGroup(idGame: string, idGroup: string): Observable<IGame> {
        return this.getGameById(idGame)
            .pipe(
                takeUntil(this._destroy$),
                switchMap(game => {
                    if (!game) {
                        throw new Error('Игра не найдена');
                    }

                    const newGame = cloneDeep(game);

                    if (!newGame?.groups) {
                        newGame.groups = [];
                    }

                    newGame.groups.push(idGroup)

                    return this.updateGame(newGame);
                })
            );
    }
}


