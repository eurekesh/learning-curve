import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as bodyParser from 'body-parser';

class Application {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.loadConfiguration();
    this.loadRoutes();
  }

  public static run(): Application {
    return new Application;
  }

  private loadConfiguration(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }))

    this.app.use(express.static(path.join(__dirname, 'public')))

    const port = process.env.PORT || '3000'
    this.app.set('port', port);

    const server = http.createServer(this.app);

    server.listen(port, () => console.log('Server active on port ' + port));
  }

  private loadRoutes() {
    let router = express.Router();
    // router.get('path/to/route', class.pubMethod.bind(class.pubMethod))
    this.app.use(router);

    this.app.get('*', (req, res) => {
      console.log('hit received!');
      // res.sendFile(path.join(__dirname, 'public/index.html'))
    })
  }
}

Application.run();
