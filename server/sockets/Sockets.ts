import {Server, Socket} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";

export class Sockets {
  private initialized: boolean;
  private io?: Server;

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

  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  private joinEvent(): void {

  }

  private registerRoomOptionsEvents(): void {

  }
}
