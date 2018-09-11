import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

class App {

    express: express.Application;

    constructor() {
        this.express = express();
        this.config();
        this.routes();
        this.errors();
    }

    config(): void {

        // view engine setup
        this.express.set('views', './src/public/views/');
        this.express.set('view engine', 'ejs');

        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cookieParser());

        this.express.use('/public', express.static(path.join(__dirname, 'public')));
    }

    routes(): void {
        var router: express.Router = express.Router();

        router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.render('index', {
                title: 'Express'
            });
        });

        this.express.use('/', router);
    }

    errors(): void {

        // catch 404 and forward to error handler
        this.express.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || 400);
            res.render('error', {
                message: 'Not Found',
                error: err
            });
        });

        // error handlers
        // development error handler
        // will print stacktrace
        if (this.express.get('env') === 'development') {
            this.express.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }

        this.express.use(function (err: any, req: express.Request, res: express.Response, next: Function) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
    }
}

export default new App().express;