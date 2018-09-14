import * as mysql from 'mysql';
import { Promise } from 'q';
import { Storage } from '../storage/storage';
import { Configurations } from '../../configurations/configurations';
import { callbackify } from 'util';

export class BaseRepository {

    private _connection: mysql.Connection;
    private _storage: Storage = new Storage();

    constructor(private connectionString?: mysql.ConnectionConfig) { }

    createConnection() {
        if (this.connectionString) {

            this._connection = mysql.createConnection(this.connectionString);

        }
        else {
            this.connectionString = new Configurations().GetConnectionString('DefaultConnection');
            this._connection = mysql.createConnection(this.connectionString);
        }

        this._connection.connect();
    }

    closeConnection() {
        if (this._connection)
            this._connection.end();
    }

    getConnection() {
        return this._connection;
    }

    _removeWibaseModelGeneratedFields(model: any) {

        var clone = JSON.parse(JSON.stringify(model));

        delete clone['$table'];
        delete clone['$insert_mode'];
        delete clone['$fk'];

        for (var prop in clone) {

            if (clone[prop] instanceof Object) {
                delete clone[prop];
            }
        }

        return clone;
    }

    /**
     * 
     * @param model the object to insert
     * @param transactionRows this are the inserted results, it will be update automaticly
     * @param isRoot Set to true only once when calling this method, used to detect if it is the root parend object to finish callback
     * @param callback callback function
     */
    _handleTransaction(model: any, transactionRows: any, isRoot: boolean, callback: Function) {

        if (model['$fk'] && transactionRows) {
            model[model['$fk']] = transactionRows.insertId;
        }

        var cleanModel = this._removeWibaseModelGeneratedFields(model);

        this._connection.query('INSERT INTO ?? SET ?', [model['$table'], cleanModel], (error: mysql.MysqlError, rows: any, fields: mysql.FieldInfo[]) => {
            if (error) {
                callback(error);
            }

            if (transactionRows) {
                transactionRows.fieldCount += rows.fieldCount;
                transactionRows.affectedRows += rows.affectedRows;
                transactionRows.changedRows += rows.changedRows;
            }
            else {
                transactionRows = rows;
            }

            for (var prop in model) {

                if (model[prop] instanceof Object && model[prop]["$table"]) {
                    this._handleTransaction(model[prop], transactionRows, false, callback);
                }

                // If it is the last property then callback
                if (Object.keys(model)[Object.keys(model).length - 1] == prop && isRoot) {
                    callback(null, transactionRows, fields);
                }
            }

        });

    }

    /**
     * @description It handles any insert, a simple one or a complex one , based on the model passed
     * @param model 
     */
    handleInsert(model: any): Promise<StorageResponse> {

        return Promise((resolve, reject) => {

            this.createConnection();

            if (model['$insert_mode'] == 'transaction') {
                this._connection.beginTransaction((err: mysql.MysqlError) => {

                    if (err) {
                        reject(this._storage.handleError(err));
                    }

                    this._handleTransaction(model, null, true, (transactionError: mysql.MysqlError, rows: any[], fields: mysql.FieldInfo[]) => {

                        if (transactionError) {
                            this._connection.rollback(() => {
                                reject(this._storage.handleError(transactionError));
                            });
                        }

                        this._connection.commit((err: mysql.MysqlError) => {

                            if (err) {
                                this._connection.rollback(() => {
                                    reject(this._storage.handleError(err));
                                });
                            }

                            resolve({ rows: rows, fields: fields });
                        });
                    });

                });
            }
            else {

                this._connection.query('INSERT INTO project SET ?', model, (err: mysql.MysqlError, rows: any[], fields: mysql.FieldInfo[]) => {
                    this.closeConnection();

                    if (err) {
                        reject(this._storage.handleError(err));
                    }

                    resolve({ rows: rows, fields: fields });
                });

            }
        });
    }

    /**
     * 
     * @param sql string of sql, don´t forget to use ? to identifier params, this will prevent sql injection  
     * @param params array of params, object
     * @example sql -> SELECT * FROM users WHERE id = ? , name = ? ; params-> [id, '1'], { id: 1}
     */
    query(sql: string, params: any): Promise<StorageResponse> {

        return Promise((resolve, reject) => {
            this.createConnection();

            this._connection.query(sql, params, (err: mysql.MysqlError, rows: any[], fields: mysql.FieldInfo[]) => {
                this.closeConnection();

                if (err) {
                    reject(this._storage.handleError(err));
                }

                resolve({ rows: rows, fields: fields });
            });

        });
    }

}