import {Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {BehaviorSubject, debounceTime, Observable, take, tap} from "rxjs";
import {ICard} from "../interfaces/card";
import {IRoomJoinState} from "../interfaces/room-join-state";
import {ConnectionState} from "../enums/connection-state";

@Injectable({
  providedIn: 'root'
})
export class RoomServiceService {
  private connectedToRoom$ = new BehaviorSubject<number>(ConnectionState.Disconnected);
  public connectionState$ = this.connectedToRoom$.asObservable();
  roomState = new BehaviorSubject<IRoomJoinState>({roomId: '-2', isHost: false });

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

  // dispatches room creation request to server
  createRoom() {
    this.socket.emit('room:create');
  }

  // dispatches join room request to server
  joinRoom(roomId: string) {
    console.log('join request to room id ' + roomId + ' dispatched')
    this.socket.emit('room:join:client_request', roomId);
  }

  // this will update room connection state if proper join packet is received
  listenForRoomJoin() {
    this.socket.fromEvent('room:join:server_directive')
      .pipe(
        take(1),
        tap(joinPacket => {
          console.log(`room:join: packet received, + ${joinPacket}`)
          const packet = joinPacket as IRoomJoinState;
          console.log(packet);
          if (packet.roomId === '-1') {
            this.connectedToRoom$.next(ConnectionState.ConnectionFailed);
          } else {
            this.connectedToRoom$.next(ConnectionState.Connected);
            this.roomState.next(packet);
          }
        })
      )
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

  resetConnectionState() {
    this.connectedToRoom$.next(ConnectionState.Disconnected);
  }

  resetRoomState() {
    this.roomState.next({roomId: '-2', isHost: false });
  }
}
