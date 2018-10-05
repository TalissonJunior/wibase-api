import { MongoClient } from 'mongodb';
import { Configurations } from '../../configurations/configurations';
import { Dialect } from '../../business/enums/dialect.enum';
import { Promise } from 'bluebird';

export class BaseRepository {
    private _storageConnection: StorageConnection;

    constructor(storageConnection?: StorageConnection) {

        if (!storageConnection) {
            this._storageConnection = new Configurations().GetConnectionString('DefaultConnection');
        }
    }

    get connection(): Promise<MongoClient> {

        switch (this._storageConnection.dialect) {

            case Dialect.MONGODB:
                return MongoClient.connect(`mongodb://${this._storageConnection.server}:${this._storageConnection.port}`)
            default:
                // Todo
                break;
        }
    }

    createCollection(collectionName: string): Promise<any> {

        return new Promise((resolve, reject) => {

            this.connection.then((client) => {
                const db = client.db(this._storageConnection.database);

                db.createCollection(collectionName, (err, dbs) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(dbs);
                    }
                })
            }).catch((erro) => {
                reject(erro);
            });
        });

    }

    insert(collectionName: string, model: any): Promise<any> {

        return new Promise((resolve, reject) => {

            this.connection.then((client) => {
                const db = client.db(this._storageConnection.database);

                db.collection(collectionName).insert(model, (err, dbs) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(dbs);
                    }
                })
            }).catch((erro) => {
                reject(erro);
            });
        });

    }

    find(collectionName: string): Promise<any> {

        return new Promise((resolve, reject) => {

            this.connection.then((client) => {
                const db = client.db(this._storageConnection.database);

                db.collection(collectionName).find({}).toArray((err, dbs) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(dbs);
                    }
                })
            }).catch((erro) => {
                reject(erro);
            });
        });

    }

}