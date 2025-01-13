import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuidv4 } from 'uuid';

import { IPlatform } from '../../data/platforms/platforms.interfaces';
import { ImageDialogComponent } from '../../components/image-dialog/image-dialog.component';
import { YesNoDialogComponent } from '../../components/yes-no-dialog/yes-no-dialog.component';
import { IGame } from '../../data/games/games.interfaces';
import { IYesNoDialogSettings } from '../../components/yes-no-dialog/yes-no-dialog.component.interface';
import { GamesService } from '../../data/games/games.service';
import { PlatformsService } from '../../data/platforms/platforms.service';

import { INewGameData } from './game.component.interface';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
    public newGameForm: UntypedFormGroup;
    public platformList: IPlatform[] = [];
    public editGame: IGame;
    
    constructor(
        public dialog: MatDialog,
        private _fb: UntypedFormBuilder,
        private _gamesService: GamesService,
        private _snackBar: MatSnackBar,
        private _router: Router,
        private _route: ActivatedRoute,
        private _platformsService: PlatformsService,
    ) {
    }

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
    
    public openImageDialog() {
        this.dialog.open(ImageDialogComponent,
            {
                width: '50vh',
                height: '50vh',
                data: this.newGameForm.value.logo
            }
        );
    }

    public resetField() {
        this._initForm();
    }
    
    public saveGame() {
        const newGame = this._mappingData(this.newGameForm.value);
        
        this._openSnackBar(newGame.name);
        
        if (this.editGame) {
            this._gamesService.editGameCL(newGame);
        } else {
            this._gamesService.setGameLC(newGame);
        }
        
        this.goToHome();
    }
    
    public goToHome() {
        this._router.navigate(['/home']);
    }
    
    public getPlatformsByTypes(ids: IPlatform['type'][]) : IPlatform[] {
        return this.platformList.filter(item => ids.includes(item.type));
    }
    
    public deleteGame() {
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
    
    public goToYandexSearch() {
        if (this.newGameForm.value.name.trim()) {
            window.open(`https://yandex.ru/search?text=игра ${this.newGameForm.value.name}`, '_blank');
        }
    }
    
    public goToYandexImage() {
        if (this.newGameForm.value.name.trim()) {
            window.open(`https://yandex.ru/images/search?text=игра ${this.newGameForm.value.name}`, '_blank');
        }
    }    
    
    private _initForm(): void {
        if (this.editGame) {
            this.newGameForm = this._fb.group({
                id: [this.editGame.id, Validators.required],
                dateEdit: [new Date(this.editGame.dateEdit as string).toISOString(), Validators.required],
                name: [this.editGame.name, Validators.required],
                logo: [this.editGame.logo, [Validators.required, this._createPasswordStrengthValidator()]],
                platforms: [this.getPlatformsByTypes(this.editGame.platforms), Validators.required],
            });
        } else {
            this.newGameForm = this._fb.group({
                id: uuidv4(),
                dateEdit: new Date().toISOString(),
                name: ['', Validators.required],
                logo: [null, [Validators.required, this._createPasswordStrengthValidator()]],
                platforms: [null, Validators.required],
            });
        }
    }
    
    private _createPasswordStrengthValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value) {
                const isVaid = control.value.includes('https://') || control.value.includes('http://')
                
                return !isVaid ? { url: true }: null;
            }
            
            return { url: true };
        }
    }
    
    private _mappingData(newGameData: INewGameData): IGame {
        return {
            id: newGameData.id,
            name: newGameData.name,
            logo: newGameData.logo,
            platforms: newGameData.platforms.map(item => item.type),
            dateEdit: new Date().toISOString(),
        };
    }
    
    private _openSnackBar(message: string) {
        this._snackBar.open(message, 'OK', { duration: 5000 });
    }
        
    private _initPlatformList() {
        this.platformList = this._platformsService.platforms;
    }
}