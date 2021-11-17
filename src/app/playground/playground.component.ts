import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSliderChange} from "@angular/material/slider";
import {BehaviorSubject, filter, take, tap} from 'rxjs';
import {ICard} from "../shared/interfaces/card";
import {RoomServiceService} from "../shared/services/room-service.service";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../home-page/home-page.component";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConnectionState} from "../shared/enums/connection-state";
// https://www.tektutorialshub.com/angular/elementref-in-angular/ <-- for accessing DOM (in unsafe way)
// https://www.tektutorialshub.com/angular/create-observable-from-event-using-fromevent-in-angular/ <-- for making DOM element observable

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  localCards: ICard[];

  private slideSubject = new BehaviorSubject(0);
  readonly slideValue$ = this.slideSubject.asObservable();

  constructor(readonly rs: RoomServiceService, public dialog: MatDialog) {
    this.localCards = rs.getCards();
  }

  ngOnInit(): void {
    this.rs.setSliderObservable(this.slideValue$);
  }

  // https://stackoverflow.com/questions/52800977/mat-slider-value-not-getting-updated-while-sliding
  sliderChange(event: MatSliderChange) {
    if (event.value != null) {
      this.slideSubject.next(event.value);
    }
  }

  openAddCardDialog() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(AddCardDialogComponent, dialogConfig);
  }

  addCard(card: ICard){
    this.localCards.push()
  }
}

@Component({
  selector: 'add-card-dialog',
  templateUrl: './playground-add-card-dialog.html',
})
export class AddCardDialogComponent {
  constructor() {}

  //https://angular.io/guide/inputs-outputs
  @Output() newCardTitleEvent = new EventEmitter<string>();

  addCard(title: String){
    console.log(title)
  }
}

