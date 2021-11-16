import {Server} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {IRoomJoin} from "../interfaces/room-join";
import {generateRoomCode} from "./utils";

export class Sockets {
  private initialized: boolean;
  private io?: Server;
  // for now, a rudimentary room check will be performed on a string array
  private createdRoomIds = [''];

  private readonly badPacket: IRoomJoin = { roomId: '-1', isHost: false }

  constructor() {
    this.initialized = false;
  }

  public initialize(inio: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>): void {
    this.io = inio;
    this.initialized = true;
  }

  public registerRoomEvents(socket: any): void {
    // console.log(socket);

    // socket.on('room:join', this.joinEvent)

    socket.on('connected', (data: any) => {
      console.log(' connected');
      socket.emit('confirm', 'hello client' + socket.id);
      // @ts-ignore
    });

    socket.on('room:create', () => {
      let newRoom = generateRoomCode(5);

      if (this.createdRoomIds.includes(newRoom)) { // just generate something longer if it's already taken
        newRoom = generateRoomCode(7);
      }
      this.createdRoomIds.push(newRoom);

      // force socket to leave its current room, and join it's allocated one
      socket.leaveAll();
      socket.join(newRoom);
      const joinPacket: IRoomJoin = {
        roomId: newRoom,
        isHost: true
      }
      socket.emit('room:join:server_directive', joinPacket);
    });


    socket.on('room:join:client_request', (roomId: string) => {
      console.log(`join:client_request: requested received for room ${roomId}`);
      if (this.createdRoomIds.includes(roomId))
      {
        const joinPacket: IRoomJoin = {
          roomId: roomId,
          isHost: false
        };

        socket.join(roomId);
        socket.emit('room:join:server_directive', joinPacket);
        return;
      }

      socket.emit('room:join:server_directive', this.badPacket);
      console.log('room:join: room not found, bad packet sent');
    })

  }

  public isInitialized(): boolean {
    return this.initialized;
  }

}
