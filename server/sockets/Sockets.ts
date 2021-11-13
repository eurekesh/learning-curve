import {Server, Socket} from "socket.io";

export class Sockets {
  private initialized: boolean;
  private socket: Socket;
  private io: Server;

  constructor(io: Server, socket: Socket) {
    this.initialized = false;
    this.io = io;
    this.socket = socket;
  }

  public registerRoomEvents(): void {

  }
}
