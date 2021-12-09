import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import {Server} from "socket.io";
import {Sockets} from "./sockets/sockets";

// drew inspiration from https://blexin.com/en/blog-en/angular-nodejs-and-typescript-together/ for initial scaffolding on this project!
class Application {
  public app: express.Application;
  private sockets = new Sockets();

  constructor() {
    this.app = express();
    this.loadConfiguration();
    this.loadRoutes();
  }

  public static run(): Application {
    return new Application;
  }

  // https://jaketrent.com/post/https-redirect-node-heroku needed for heroku
  private static requireHTTPS(req: express.Request, res: express.Response, next: any) {
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
      return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
  }

  private loadConfiguration(): void {
    // compression must happen at highest level
    this.app.use(compression());

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));

    this.app.use(express.static(path.join(__dirname, '../public')));

    this.app.use(Application.requireHTTPS);

    const port = process.env.PORT || '3030'
    this.app.set('port', port);

    const server = http.createServer(this.app);
    const io = new Server(server);

    this.sockets.initialize(io);

    io.on('connection', this.sockets.registerRoomEvents.bind(this.sockets)); // context binding, took way too long to figure this out

    // debugging
    io.of("/").adapter.on("create-room", (room) => {  console.log(`room ${room} was created`);});
    io.of("/").adapter.on("join-room", (room, id) => {  console.log(`socket ${id} has joined room ${room}`);});
    io.of("/").adapter.on("leave-room", (room, id) => {  console.log(`socket ${id} has joined room ${room}`);});

    server.listen(port, () => console.log('Server active on port ' + port));
  }

  private loadRoutes() {
    let router = express.Router();
    this.app.use(router);

    this.app.get('*', (req, res) => {
      console.log('hit received!');
      res.sendFile(path.join(__dirname, '../public/index.html'))
    })
  }
}

Application.run();
