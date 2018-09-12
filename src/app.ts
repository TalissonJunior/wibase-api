import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { attachControllers } from '@decorators/express';
import { ProjectController, ViewController } from './controller/controllers';

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
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cookieParser());

        this.express.use('/css', express.static(path.join(__dirname, 'css')));
        this.express.use('/views', express.static(path.join(__dirname, 'views')));
    }

    routes(): void {
        var router: express.Router = express.Router();

        attachControllers(router, [ViewController, ProjectController]);
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