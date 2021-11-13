import {Server, Socket} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";

export class Sockets {
  private initialized: boolean;
  private io?: Server;

  constructor() {
    this.initialized = false;
  }

  public initialize(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>): void {
    this.io = io;
    this.initialized = true;
  }

  public registerRoomEvents(socket: any): void {
    if (this.io) {
      this.io.on('room:join', this.joinEvent)
    }
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  private joinEvent(): void {

  }

  private registerRoomOptionsEvents(): void {

  }
}
