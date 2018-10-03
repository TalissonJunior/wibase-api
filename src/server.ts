import app from './app';
import * as http from 'http';
import { Network, Log } from './business/utils';
import * as WebSocket from 'ws';
import { httpEventEmitter } from './business/const/http-event-emitter.const';

class Server {
    port: boolean | string | number;
    server: http.Server = null;
    network: Network = new Network();
    websockets: any = {};

    constructor() {
        this.config();
    }

    config(): void {
        this.port = this._normalizePort(process.env.PORT || 3000);
        app.set('port', this.port);

        //initialize a simple http server
        this.server = http.createServer(app);

        //initialize the WebSocket server instance
        const wss = new WebSocket.Server({ server: this.server, path: "/wibase" });

        wss.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {
            
            console.log(req.url)
            //connection is up, let's add a simple simple event
            ws.on('message', (message: string) => {

                //log the received message and send it back to the client
                ws.send(`Hello, you sent -> ${message}`);
            });

            httpEventEmitter.on('post', () => {
               // ws.emit()
            });
            
            ws.send("Connected to wibase!");
        });

        this.server.on('error', this.onError);
        this.server.on('listening', this.onListening);

        this.server.listen(this.port);
    }

    onError(error: NodeJS.ErrnoException): void {

        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port ' + this.port;

        switch (error.code) {
            case 'EACCES':
                Log.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                Log.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }

        Log.error(JSON.stringify(error));
    }

    onListening = (): void => {
        var serverInfo = `[INFO] Server running!\n\n\tLocal: http://localhost:${this.port}`;

        this.network.getIPAddresses().forEach(IPaddress => {
            serverInfo += `\n\tExternal: http://${IPaddress}:${this.port}`;
        });

        Log.log(serverInfo);
        Log.info("\n\tUse Ctrl+C to quit this process\n");
    }

    private _normalizePort(value: number | string): boolean | string | number {
        const port: number = (typeof value === 'string') ? parseInt(value, 10) : value;

        if (isNaN(port)) {
            return value;
        }
        else if (port >= 0) {
            return port;
        }
        else {
            return false;
        }
    }
}

export default new Server();