import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RoomServiceService} from "../services/room-service.service";
import {Card} from "../interfaces/card";
import { fromEvent } from 'rxjs';
// https://www.tektutorialshub.com/angular/elementref-in-angular/ <-- for accessing DOM (in unsafe way)
// https://www.tektutorialshub.com/angular/create-observable-from-event-using-fromevent-in-angular/ <-- for making DOM element observable

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  localCard: Card[];
  @ViewChild('slider') slider: ElementRef;

  constructor(readonly rs: RoomServiceService) {
    this.localCard = rs.getCards();
  }

  ngOnInit(): void {
  }

  // https://stackoverflow.com/questions/42454740/angular-2-subscribing-to-observable-fromevent-error-invalid-event-target
  ngAfterViewInit() {
    let slider$ = fromEvent(this.slider.nativeElement, 'mouseup')
      .subscribe(res => console.log(res));
  }

}

