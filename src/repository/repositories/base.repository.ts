import * as mysql from 'mysql';
import { Promise } from 'q';
import { Storage } from '../storage/storage';
import { Configurations } from '../../configurations/configurations';
import { callbackify } from 'util';

export class BaseRepository {

    private _connection: mysql.Connection;
    private _storage: Storage = new Storage();

    constructor(private connectionString?: mysql.ConnectionConfig) { }

    /**
     * @description Creates and open the connection.
     */
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

    /**
     * @description Cleans the wibase properties used to handle some business logics,
     *  like '$table', '$insert_mode', '$fk' properties and childs that are a instance of object.
     * @param model 
     * @returns A clean clone of the model
     */
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
     * @description Perform a complex insert, it will save the parent object id
     *  on the child object '$fk' property value if exists, perform a insert and do the process all over again.
     * @param model the object to insert
     * @param transactionRows the result
     * @param isRoot Used to detect if it is the root parent object "the first insert", so it can call the callback function.
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
     * @description A insert method that can either use transaction method or a simple query to perform the insert,
     * it will depend if the model is either a complex or simple model. A complex model is when you have to
     * perfom multiples inserts that depends on the id of the previous insert.
     * 
     * @example Complex model => 
     * { name: 'teste' , $table: 'project', category: { name: 'web', $table: 'category' }}
     * 
     * Simple model =>  
     * { name: 'teste' , $table: 'project'}
     * @param model model to perfom the insert
     */
    insert(model: any): Promise<StorageResponse> {

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

                var cleanModel = this._removeWibaseModelGeneratedFields(model);

                this._connection.query('INSERT INTO ?? SET ?', [model['$table'], cleanModel], (err: mysql.MysqlError, rows: any[], fields: mysql.FieldInfo[]) => {
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
     * @param sql string of sql
     * @param params array of params, object
     * @example sql => 
     * #1 'SELECT * FROM users WHERE id = ? , name = ?'
     * #2 'SELECT * FROM users WHERE ?'
     *   
     * params => 
     * #1 [1, 'teste']     
     * #2 { id: 1 , name: 'teste'}
     * */
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