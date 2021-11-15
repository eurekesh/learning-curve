import {Component, OnInit} from '@angular/core';
import {RoomServiceService} from "../services/room-service.service";
import {Card} from "../interfaces/card";
import {MatSliderChange} from "@angular/material/slider";
import {BehaviorSubject} from 'rxjs';
// https://www.tektutorialshub.com/angular/elementref-in-angular/ <-- for accessing DOM (in unsafe way)
// https://www.tektutorialshub.com/angular/create-observable-from-event-using-fromevent-in-angular/ <-- for making DOM element observable

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  localCard: Card[];
  private slideSubject = new BehaviorSubject(0);
  readonly slideValue$ = this.slideSubject.asObservable();

  constructor(readonly rs: RoomServiceService) {
    this.localCard = rs.getCards();
  }

  ngOnInit(): void {
  }

  // https://stackoverflow.com/questions/52800977/mat-slider-value-not-getting-updated-while-sliding
  sliderChange(event: MatSliderChange) {
    //console.log(event.value)
    if (event.value != null) {
      this.slideSubject.next(event.value);
    }
  }


}

