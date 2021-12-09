import {Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {BehaviorSubject, debounceTime, Observable, skipWhile, take, tap} from "rxjs";
import {ICard} from "../interfaces/card";
import {IRoomJoinState} from "../interfaces/room-join-state";
import {ConnectionState} from "../enums/connection-state";

@Injectable({
  providedIn: 'root'
})
export class RoomServiceService {
  roomState = new BehaviorSubject<IRoomJoinState>({roomId: '-2', isHost: false});
  private connectedToRoom$ = new BehaviorSubject<number>(ConnectionState.Disconnected);
  public connectionState$ = this.connectedToRoom$.asObservable();
  private roomSliderAverage$ = new BehaviorSubject<number>(0);
  public roomSliderObs$ = this.roomSliderAverage$.asObservable();
  private newCards$ = new BehaviorSubject<ICard[]>([]);
  public newCardsObs$ = this.newCards$.asObservable();

  constructor(readonly socket: Socket) {
    this.sendConnectionConfirmation();
    this.listenForQuestionChange();
    this.listenForNewCard()

  }

  sendConnectionConfirmation() {
    this.socket.emit('connected', 'hello');
    console.log('sent confirmation')
  }

  listenForSliderUpdates() {
    this.socket.fromEvent('room:patch:slider:server_directive')
      .pipe(tap(data => this.roomSliderAverage$.next(data as number)))
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

  sendQuestionChange(newQuestion: string) {
    this.socket.emit('room:update:question', newQuestion);
  }

  listenForQuestionChange() {
    this.socket.fromEvent('room:update:question:server_directive')
      .pipe(
        tap(question => {
          console.log('new question received');
          const currRoomState = this.roomState.value;
          currRoomState.activeQuestion = question as string;
          this.roomState.next(currRoomState);
        })
      )
      .subscribe();
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
            if (packet.isHost) {
              this.listenForSliderUpdates();
            }
            this.roomState.next(packet);
          }
        })
      )
      .subscribe();
  }

  sendNewCard(c: ICard) {
    this.socket.emit('room:update:newCard', c);
  }

  listenForNewCard() {
    this.socket.fromEvent('room:update:newCard:server_directive')
      .pipe(
        //take(1),
        tap(newCardPacket => {
          const newCard = newCardPacket as ICard;
          const newCardsCopy = this.newCards$.getValue()
          newCardsCopy.push(newCard)
          this.newCards$.next(newCardsCopy)
        })
      ).subscribe()
  }

  // getCards(): ICard[] {
  //   const c: ICard = {
  //     title: "ex",
  //     subTitle: "ex ex",
  //     cardType: 'Question',
  //     content: "dummy q"
  //   }
  //   return [c,c,c,c,c,c];
  // }


  setSliderObservable(inputObs$: Observable<number>): void {
    inputObs$
      .pipe(
        debounceTime(500),
        skipWhile(_ => this.roomState.value.isHost === true),
        tap(x => {
          this.socket.emit('room:join:update_slider_data', x);
          console.log(x);
        })
      )
      .subscribe();
  }

  resetConnectionState() {
    this.connectedToRoom$.next(ConnectionState.Disconnected);
  }

  resetRoomState() {
    this.roomState.next({roomId: '-2', isHost: false});
  }
}
