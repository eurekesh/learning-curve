import {Component, OnInit} from '@angular/core';
import {MatSliderChange} from "@angular/material/slider";
import {BehaviorSubject} from 'rxjs';
import {ICard} from "../shared/interfaces/card";
import {RoomServiceService} from "../shared/services/room-service.service";
// https://www.tektutorialshub.com/angular/elementref-in-angular/ <-- for accessing DOM (in unsafe way)
// https://www.tektutorialshub.com/angular/create-observable-from-event-using-fromevent-in-angular/ <-- for making DOM element observable

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  localCard: ICard[];


  private slideSubject = new BehaviorSubject(0);
  readonly slideValue$ = this.slideSubject.asObservable();

  constructor(readonly rs: RoomServiceService) {
    this.localCard = rs.getCards();
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

}

