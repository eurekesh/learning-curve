import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {debounceTime, Observable, tap} from "rxjs";
import {ICard} from "../interfaces/card";

@Injectable({
  providedIn: 'root'
})
export class RoomServiceService {

  constructor(readonly socket: Socket) {
    this.sendConnectionConfirmation();
    this.outputTest();
  }

  sendConnectionConfirmation() {
    this.socket.emit('connected', 'hello');
    console.log('sent confirmation')
  }

  outputTest() {
    this.socket.fromEvent('confirm')
      .pipe(tap(data => console.log(data)))
      .subscribe();
  }

  getCards(): ICard[] {
    const c: ICard = {
      title: "dummy thicc ",
      subTitle: "dummy sub title",
      cardType: 'Question',
      content: "dummy"
    }
    return [c,c,c,c,c,c];
  }

  setSliderObservable(inputObs$: Observable<number>): void {
    inputObs$
      .pipe(
        debounceTime(500),
        tap(x => {
          this.socket.emit('slider update', x);
          console.log(x);
        })
      )
      .subscribe();
  }

}
