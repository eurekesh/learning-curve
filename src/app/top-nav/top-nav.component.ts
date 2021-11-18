import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RoomServiceService} from "../shared/services/room-service.service";
import {ICard} from "../shared/interfaces/card";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor(readonly rs: RoomServiceService,
              readonly dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  openAddCardDialog() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(AddCardDialogComponent, dialogConfig);
  }

}

@Component({
  selector: 'add-card-dialog',
  templateUrl: './add-card-dialog.html',
})
export class AddCardDialogComponent {
  //constructor(public playground: PlaygroundComponent) {} // has nullinjector error
  constructor() {}

  //https://angular.io/guide/inputs-outputs
  @Output() newCardTitleEvent = new EventEmitter<string>();

  addCard(inputTitle: string){
    let c: ICard = {
      title: inputTitle,
      subTitle: '',
      cardType: 'Question',
      content: ''
    };

    //this.playground.addCard(c);
    console.log(inputTitle)
  }
}
