import {Component, OnInit} from '@angular/core';
import {MatSliderChange} from "@angular/material/slider";
import {BehaviorSubject} from 'rxjs';
import {ICard} from "../shared/interfaces/card";
import {RoomServiceService} from "../shared/services/room-service.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
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

  addCard(card: ICard){
    console.log("In playground.addcard")
    this.localCards.push(card)
  }

  openChangeQuestionDialog() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(ChangeQuestionDialog, dialogConfig);
  }
}

@Component({
  selector: 'app-change-question-dialog',
  templateUrl: './change-question-dialog.component.html'
})
export class ChangeQuestionDialog {
  constructor(readonly rs: RoomServiceService) {
  }

  sendQuestion(newQuestion: string) {
    this.rs.sendQuestionChange(newQuestion);
  }
}

