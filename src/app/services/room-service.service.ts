import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {map, tap} from "rxjs";

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

}
