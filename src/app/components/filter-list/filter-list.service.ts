import {
    Injectable,
    type OnDestroy,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import type { IGame, IGameGroup } from '../../types/games.interfaces';
import type { IGamingAccount } from '../../types/gaming-accounts.interfaces';
import type { IPlatform } from '../../types/platforms.interfaces';
import type { ISortItem, TQueueFilters, TTypesFilters } from './filter-list.interface';

@Injectable()
export class FilterListService implements OnDestroy {
    public filters$: BehaviorSubject<TQueueFilters>;

    public readonly sortList: ISortItem[] = [
        {
            id: 'sort_create_date',
            name: 'Дата создания',
            type: 'createDate',
            icon: 'calendar_today',
        },
        {
            id: 'sort_edit_date',
            name: 'Дата изменения',
            type: 'editDate',
            icon: 'calendar_today',
        },
        {
            id: 'sort_alphabet',
            name: 'Алфавит',
            type: 'alphabet',
            icon: 'text_fields',
        },
    ];
    public readonly defaultSort: ISortItem = this.sortList[1];

    private _defaultGamesList: IGame[];
    private readonly _defaultFilters: TQueueFilters = {
        sort: {
            queue: 0,
            value: this.defaultSort,
        },
    };
    private readonly _destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public get defaultFilters(): TQueueFilters {
        return this._defaultFilters;
    }

    public initialize(games: IGame[]): void {
        this._defaultGamesList = games;
        this.filters$ = new BehaviorSubject(this._defaultFilters);
    }

    public applyFilterGamesList(filters: TQueueFilters): IGame[] {
        let resultGamesList: IGame[] = this._defaultGamesList;

        const filterArray = Object.entries(filters)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([ _, value ]) => value !== undefined)
            .map(([ key, value ]) => ({
                type: key as TTypesFilters,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                queue: value!.queue as number,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                value: value!.value,
            }))
            .sort((a, b) => a.queue - b.queue);

        filterArray.forEach(filterItem => {
            switch (filterItem.type) {
                case 'search': {
                    const value = filterItem.value as string;

                    resultGamesList = resultGamesList.filter(game => game.name.toLowerCase().includes(value.toLowerCase()));
                    break;
                }
                case 'platform': {
                    const value = filterItem.value as IPlatform;

                    resultGamesList = resultGamesList.filter(game => game.platforms.includes(value.type));
                    break;
                }
                case 'group': {
                    const value = filterItem.value as IGameGroup;

                    resultGamesList = resultGamesList.filter(game => game.groups?.includes(value.id));
                    break;
                }
                case 'account': {
                    const value = filterItem.value as IGamingAccount;

                    resultGamesList = resultGamesList.filter(game => game.accounts?.includes(value.id));
                    break;
                }
                case 'completed': {
                    resultGamesList = resultGamesList.filter(game => game.completed);
                    break;
                }
            }
        });

        if (filters.sort?.value) {
            this._sortData(resultGamesList, filters.sort?.value);
        }

        return [ ...resultGamesList ];
    }

    private _sortData(games: IGame[], sort: ISortItem): void {
        switch (sort.type) {
            case 'createDate': {
                games.sort((a, b) => {
                    if (a.dateCreate && b.dateCreate) {
                        return new Date(b.dateCreate).getTime() - new Date(a.dateCreate).getTime()
                    } else if (a.dateCreate) {
                        return 1;
                    } else if (b.dateCreate) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                break
            }
            case 'editDate': {
                games.sort((a, b) => new Date(b.dateEdit).getTime() - new Date(a.dateEdit).getTime());
                break
            }
            case 'alphabet': {
                this._sortByAlphabet(games);
                break
            }
        }

    }

    private _sortByAlphabet(games: IGame[]): void {
        games.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }

            return 0;
        });
    }

    /*
    private _sortByDateEdit(games: IGame[]): void {
        games.sort((a,b) => {
            const dateA = new Date(a.dateEdit);
            const dateB = new Date(b.dateEdit);

            return dateB.getTime() - dateA.getTime();
        });
    }
    */
}
