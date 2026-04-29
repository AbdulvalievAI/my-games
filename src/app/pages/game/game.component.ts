import { DatePipe } from '@angular/common';
import {
    Component,
    inject,
    type OnInit,
} from '@angular/core';
import {
    type AbstractControl,
    FormBuilder,
    type FormGroup,
    ReactiveFormsModule,
    type ValidationErrors,
    type ValidatorFn,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
    ActivatedRoute,
    type Params,
    Router,
} from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

import { HeaderComponent } from "../../components/header/header.component";
import { ImageDialogComponent } from '../../components/image-dialog/image-dialog.component';
import { LogoPlatformComponent } from "../../components/logo-platform/logo-platform.component";
import { YesNoDialogComponent } from '../../components/yes-no-dialog/yes-no-dialog.component';
import type { IYesNoDialogSettings } from '../../components/yes-no-dialog/yes-no-dialog.component.interface';
import { GamesService } from '../../services/games.service';
import { PlatformsService } from '../../services/platforms.service';
import type { IGame } from '../../types/games.interfaces';
import type { IPlatform } from '../../types/platforms.interfaces';
import type { INewGameForm, INewGameFormValue } from './game.component.interface';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: [ './game.component.scss' ],
    standalone: true,
    providers: [
        GamesService,
        PlatformsService,
    ],
    imports: [
    MatSnackBarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDividerModule,
    DatePipe,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    HeaderComponent,
    LogoPlatformComponent
],
})
export class GameComponent implements OnInit {
    public dialog = inject(MatDialog);
    private readonly _fb = inject(FormBuilder);
    private readonly _gamesService = inject(GamesService);
    private readonly _snackBar = inject(MatSnackBar);
    private readonly _router = inject(Router);
    private readonly _route = inject(ActivatedRoute);
    private readonly _platformsService = inject(PlatformsService);

    public newGameForm: FormGroup<INewGameForm>;
    public platformList: IPlatform[] = [];
    public editGame: IGame;

    ngOnInit(): void {
        this._initPlatformList();

        this._route.params.subscribe((params: Params) => {
            const game = this._gamesService.getGameById(params['id']);

            if (game) {
                this.editGame = game;
            }
        });

        this._initForm();
    }

    public openImageDialog(): void {
        this.dialog.open(ImageDialogComponent,
            {
                width: '50vh',
                height: '50vh',
                data: this.newGameForm.value.logo
            }
        );
    }

    public resetField(): void {
        this._initForm();
    }

    public saveGame(): void {
        const formData = this.newGameForm.getRawValue() as INewGameFormValue;
        const newGame = this._mappingData(formData);

        this._openSnackBar(newGame.name);

        if (this.editGame) {
            this._gamesService.editGameCL(newGame);
        } else {
            this._gamesService.setGameLC(newGame);
        }

        this.goToHome();
    }

    public goToHome(): void {
        this._router.navigate([ '/home' ]);
    }

    public deleteGame(): void {
        const dialogRef = this.dialog.open<YesNoDialogComponent, IYesNoDialogSettings>(
            YesNoDialogComponent,
            {
                data: {
                    textDialog: 'Удалить игру?',
                    yesTextButton: 'УДАЛИТЬ',
                    noTextButton: 'Отмена',
                },
            },
        );

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._gamesService.deleteGame(this.editGame);
                this.goToHome();
            }
        });
    }

    public goToYandexSearch(): void {
        if (this.newGameForm.value.name?.trim()) {
            window.open(`https://yandex.ru/search?text=игра ${this.newGameForm.value.name}`, '_blank');
        }
    }

    public goToYandexImage(): void {
        if (this.newGameForm.value.name?.trim()) {
            window.open(`https://yandex.ru/images/search?text=игра ${this.newGameForm.value.name}`, '_blank');
        }
    }

    private _initForm(): void {
        if (this.editGame) {
            this.newGameForm = this._fb.group({
                id: [ this.editGame.id, Validators.required ],
                dateEdit: [ new Date(this.editGame.dateEdit).toISOString(), Validators.required ],
                name: [ this.editGame.name, Validators.required ],
                logo: [ this.editGame.logo, [ Validators.required, this._createPasswordStrengthValidator() ] ],
                platforms: [
                    this._platformsService.getPlatformsByTypes(this.platformList, this.editGame.platforms),
                    Validators.required
                ],
            });
        } else {
            this.newGameForm = this._fb.group({
                id: [ uuidv4(), Validators.required ],
                dateEdit: [ new Date().toISOString(), Validators.required ],
                name: [ '', Validators.required ],
                logo: [ '', [ Validators.required, this._createPasswordStrengthValidator() ] ],
                platforms: [ [] as IPlatform[], Validators.required ],
            });
        }
    }

    private _createPasswordStrengthValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value) {
                const value: string = control.value as string;
                const isVaid: boolean = value.includes('https://') || value.includes('http://');

                return !isVaid ? { url: true } : null;
            }

            return { url: true };
        }
    }

    private _mappingData(newGameData: INewGameFormValue): IGame {
        return {
            id: newGameData.id,
            name: newGameData.name,
            logo: newGameData.logo,
            platforms: newGameData.platforms.map(item => item.type),
            dateEdit: new Date().toISOString(),
        };
    }

    private _openSnackBar(message: string): void {
        this._snackBar.open(message, 'OK', { duration: 5000 });
    }

    private _initPlatformList(): void {
        this.platformList = this._platformsService.platforms;
    }
}
