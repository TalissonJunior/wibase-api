import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as expressPromise from 'express-promise';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as compression from 'compression';

import { attachControllers } from '@decorators/express';
import { ViewController} from './controller/controllers';

class App {

    express: express.Application;

    constructor() {
        this.express = express();
        this.config();
        this.routes();
        this.handleErrors();
    }

    config(): void {

        // view engine setup
        this.express.set('views', path.join(__dirname, 'views'));
        this.express.set('view engine', 'ejs');

        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cookieParser());
        this.express.use(expressPromise());
        this.express.use(compression());
        this.express.use(helmet());
        this.express.use(cors());

        // static resources
        this.express.use('/css', express.static(path.join(__dirname, 'css')));
        this.express.use('/views', express.static(path.join(__dirname, 'views')));

        // cors
        this.express.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header("Access-Control-Allow-Headers", "Authorization");
            next();
        });
    }

    routes(): void {
        var router: express.Router = express.Router();

        attachControllers(router, [ViewController]);
        this.express.use('/', router);
    }

    handleErrors(): void {

        this.express.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

            if (err.status == 400) {
                res.status(400);
                res.render('error', {
                    message: 'Not Found',
                    error: err
                });
            }
            else {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            }

        });
    }
}

export default new App().express;