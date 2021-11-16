import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import {Server} from "socket.io";
import {Sockets} from "./sockets/Sockets";
import {instrument} from "@socket.io/admin-ui";

class Application {
  public app: express.Application;
  private sockets = new Sockets;

  constructor() {
    this.app = express();
    this.loadConfiguration();
    this.loadRoutes();
  }

  public static run(): Application {
    return new Application;
  }

  private static requireHTTPS(req: express.Request, res: express.Response, next: any) {
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
      return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
  }

  private loadConfiguration(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}))

    this.app.use(express.static(path.join(__dirname, 'public')))
    this.app.use(Application.requireHTTPS);
    this.app.use(compression());

    const port = process.env.PORT || '3030'
    this.app.set('port', port);

    const server = http.createServer(this.app, );
    const io = new Server(server, {
      cors: {origin: ["https://admin.socket.io"], credentials: true}
    });
    console.log(io);
    this.sockets.initialize(io);
    instrument(io, {
      auth: {
        type: 'basic',
        username: 'admin',
        password: process.env.SOCKETIOPW || '$2a$12$KyjK2vZcxo1tfD5NvuIA.ulU2hO.jUYMNE6/kftqyftC6/X5J3ERW'
      }
    })
    io.on('connection', this.sockets.registerRoomEvents);

    server.listen(port, () => console.log('Server active on port ' + port));
  }

  private loadRoutes() {
    let router = express.Router();
    // router.get('path/to/route', class.pubMethod.bind(class.pubMethod))
    this.app.use(router);

    this.app.get('*', (req, res) => {
      console.log('hit received!');
      res.sendFile(path.join(__dirname, 'public/index.html'))
    })
  }
}

Application.run();
