import {Server} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {IRoomJoin} from "../interfaces/room-join";
import {generateRoomCode} from "./utils";
import {IRoomState} from "../interfaces/room-state";

export class Sockets {
  private initialized: boolean;
  private io?: Server;
  // for now, a rudimentary room check will be performed on a string array
  private createdRoomIds = new Map<string, IRoomState>();

  private readonly badPacket: IRoomJoin = { roomId: '-1', isHost: false }

  constructor() {
    this.initialized = false;
  }

  public initialize(inio: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>): void {
    this.io = inio;
    this.initialized = true;
  }

  public registerRoomEvents(socket: any): void {
    socket.on('connected', () => {
      socket.emit('confirm', 'hello client' + socket.id);
    });

    socket.on('room:create', () => {
      let newRoomId = generateRoomCode(5);

      if (this.createdRoomIds.has(newRoomId)) { // just generate something longer if it's already taken
        newRoomId = generateRoomCode(7);
      }

      const newRoomObj: IRoomState = {
        roomId: newRoomId,
        hostId: socket.id,
        guestIds: new Map<string, number>(),
        activeQuestion: "How well do you get this?"
      }

      this.createdRoomIds.set(newRoomId, newRoomObj);

      // force socket to leave its current room, and join it's allocated one
      socket.leaveAll();
      socket.join(newRoomId);

      const joinPacket: IRoomJoin = {
        roomId: newRoomId,
        isHost: true,
        activeQuestion: "How well do you get this?"
      }

      socket.emit('room:join:server_directive', joinPacket);
    });


    socket.on('room:join:client_request', (roomId: string) => {
      socket.leaveAll();
      console.log(`join:client_request: requested received for room ${roomId}`);

      if (this.createdRoomIds.has(roomId))
      {
        const joinPacket: IRoomJoin = {
          roomId: roomId,
          isHost: false,
          activeQuestion: this.createdRoomIds.get(roomId)!.activeQuestion
        };

        this.createdRoomIds.get(roomId)!.guestIds.set(socket.id, 0);

        socket.join(roomId);
        socket.emit('room:join:server_directive', joinPacket);
        return;
      }

      socket.emit('room:join:server_directive', this.badPacket);
      console.log('room:join: room not found, bad packet sent');
    })

    // remove client from room list
    socket.on('disconnecting', () => {
      console.log(socket.id + ' is disconnecting');
      const clientRoomId = [...socket.rooms][0];
      console.log([...socket.rooms])
      if(this.createdRoomIds.has(clientRoomId)) {
        console.log('number of clients in room before leaving is ' + this.createdRoomIds.get(clientRoomId)!.guestIds.size);
        this.createdRoomIds.get(clientRoomId)!.guestIds.delete(socket.id);
        console.log('number of clients in room after leaving is ' + this.createdRoomIds.get(clientRoomId)!.guestIds.size);
        this.calculateRoomAverage(clientRoomId);
      }
    });

    socket.on('room:join:update_slider_data', (clientSliderVal: number) => {
      const clientRoom = [...socket.rooms][0];
      if(this.createdRoomIds.has(clientRoom)) {
        this.createdRoomIds.get(clientRoom)!.guestIds.set(socket.id, clientSliderVal);
        this.calculateRoomAverage(clientRoom);
      }
    });

    socket.on('room:update:question', (newQuestion: string) => {
      const userRoom = Sockets.getUserRoom(socket);
      console.log('new question change requested')
      if(this.createdRoomIds.has(userRoom) && this.createdRoomIds.get(userRoom)!.hostId === socket.id) { // sanity check
        console.log('we got here')
        const oldRoom = this.createdRoomIds.get(userRoom);
        oldRoom!.activeQuestion = newQuestion; // keep track of room state on this side

        socket.to(userRoom).emit('room:update:question:server_directive', newQuestion);
      }
    })
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  private calculateRoomAverage(roomId: string): void {
    // if no body is left in the room, let the host know
    if (this.createdRoomIds.get(roomId)!.guestIds.size === 0) {
      this.io!.in(roomId).emit('room:patch:slider:server_directive', 0);
      return;
    }

    let sum = 0;
    for(let [key, val] of this.createdRoomIds.get(roomId)!.guestIds) {
      sum += val;
    }

    const result = Math.floor(sum / this.createdRoomIds.get(roomId)!.guestIds.size);
    console.log('average for room ' + roomId + ' is ' + result);
    this.io!.in(roomId).emit('room:patch:slider:server_directive', result);
  }

  private static getUserRoom(socket: any): string {
    return [...socket.rooms][0];
  }
}
