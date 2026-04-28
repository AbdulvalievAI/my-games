import { Component, inject,type OnInit } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';

@Component({
    selector: 'app-image-dialog',
    templateUrl: './image-dialog.component.html',
    styleUrls: [ './image-dialog.component.scss' ],
    standalone: true,
    imports: [
        MatDialogModule,
    ],
})
export class ImageDialogComponent implements OnInit {
    ngOnInit(): void {
        console.log('===> image-dialog.component > this', this);
    }
    readonly dialogRef = inject(MatDialogRef<ImageDialogComponent>);
    public readonly data: string = inject<string>(MAT_DIALOG_DATA);

}
