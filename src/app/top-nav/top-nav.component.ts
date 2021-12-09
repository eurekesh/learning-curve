import {Component} from '@angular/core';
import {RoomServiceService} from "../shared/services/room-service.service";
import {ICard} from "../shared/interfaces/card";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

// components are the controllers behind the views (html) and present data sent by or maintained by the application (model), MVC pattern
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {

  constructor(readonly rs: RoomServiceService,
              readonly dialog: MatDialog) {

  }

  // FAB hit! Time to add a question
  openAddCardDialog() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(AddCardDialogComponent, dialogConfig);
  }

}

@Component({
  templateUrl: './add-card-dialog.html',
})
export class AddCardDialogComponent {
  constructor(readonly roomService: RoomServiceService,
              readonly _snackbar: MatSnackBar) {
  }

  addCard(inputTitle: string, inputContent: string) {
    if (inputTitle.length === 0 || inputContent.length === 0) {
      this._snackbar.open('You cannot enter a malformed question!', 'Okay', {
        duration: 3000
      })
      return;
    }

    let c: ICard = {
      title: inputTitle,
      content: inputContent
    };

    this.roomService.sendNewCard(c)

    console.log(inputTitle)
  }
}
