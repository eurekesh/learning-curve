import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {map, tap} from "rxjs";
import {Card} from "../interfaces/card";

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

  getCards(): Card[] {
    const c: Card = {
      title: "dummy thicc ",
      subTitle: "dummy sub title",
      cardType: 'Question',
      content: "dummy"
    }
    return [c,c,c,c,c,c];
  }



}
