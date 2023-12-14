import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.scss']
})
export class EditGameComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
}

  ngOnInit(): void {
    /*this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
       
    })*/
  }

}
