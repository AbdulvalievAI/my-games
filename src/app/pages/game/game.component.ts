import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { v4 as uuidv4 } from 'uuid';
import { DataService } from 'src/app/services/data.service';
import { IPlatform } from 'src/app/interfaces/platform.interface';

import { ImageDialogComponent } from 'src/app/components/image-dialog/image-dialog.component';
import { YesNoDialogComponent } from 'src/app/components/yes-no-dialog/yes-no-dialog.component';
import { INewGameData } from './game.component.interface';
import { IGame } from 'src/app/interfaces/game.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IYesNoDialogSettings } from 'src/app/components/yes-no-dialog/yes-no-dialog.component.interface';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
    public newGameForm: FormGroup;
    public platformList: IPlatform[] = [];
    public editGame: IGame;
    
    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.initPlatformList();
        
        this.route.params.subscribe((params: Params) => {
            const game = this.dataService.getGameById(params['id']);
           
            if (game) {
                this.editGame = game;
            }
        });
        
        this.initForm();
    }
    
    private initForm(): void {
        if (this.editGame) {
            this.newGameForm = this.fb.group({
                id: [this.editGame.id, Validators.required],
                dateEdit: [new Date(this.editGame.dateEdit as string).toISOString(), Validators.required],
                name: [this.editGame.name, Validators.required],
                logo: [this.editGame.logo, [Validators.required, this.createPasswordStrengthValidator()]],
                platforms: [this.getPlatformsByTypes(this.editGame.platforms), Validators.required],
            });
        } else {
            this.newGameForm = this.fb.group({
                id: uuidv4(),
                dateEdit: new Date().toISOString(),
                name: ['', Validators.required],
                logo: [null, [Validators.required, this.createPasswordStrengthValidator()]],
                platforms: [null, Validators.required],
            });
        }
    }
    
    private initPlatformList() {
        this.platformList = this.dataService.platforms;
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
        this.initForm();
    }
    
    public saveGame() {
        const newGame = this.mappingData(this.newGameForm.value);
        
        this.openSnackBar(newGame.name);
        if (this.editGame) {
            this.dataService.editGameCL(newGame);
        } else {
            this.dataService.setGameLC(newGame);
        }
        this.goToHome();
    }
    
    private mappingData(newGameData: INewGameData): IGame {
        return {
            id: newGameData.id,
            name: newGameData.name,
            logo: newGameData.logo,
            platforms: newGameData.platforms.map(item => item.type),
            dateEdit: new Date().toISOString(),
        };
    }
    
    private openSnackBar(message: string) {
        this._snackBar.open(message, 'OK', { duration: 5000 });
    }
    
    public goToHome() {
        this.router.navigate(['/home']);
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
                this.dataService.deleteGame(this.editGame);
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
    
    private createPasswordStrengthValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value) {
                const isVaid = control.value.includes('https://') || control.value.includes('http://')
                
                return !isVaid ? { url: true }: null;
            }
            
            return { url: true };
        }
    }
}