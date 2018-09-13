import * as mysql from 'mysql';
import { Configurations } from '../../configurations/configurations';
import { Promise } from 'q';
import { Database } from '../database/database';

export class BaseRepository {

    private _connection: mysql.Connection;
    private _database: Database = new Database();

    constructor(private connectionString?: string) {}

    createConnection() {
        if (this.connectionString) {

            var _connectionStringFromConfigurations = new Configurations().GetConnectionString(this.connectionString);

            this._connection = _connectionStringFromConfigurations != null ? mysql.createConnection(_connectionStringFromConfigurations) : mysql.createConnection(this.connectionString);

        }
        else {
            this._connection = mysql.createConnection(new Configurations().GetConnectionString('defaultConnection'));
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
     * 
     * @param sql string of sql, don´t forget to use ? to identifier params, this will prevent sql injection  
     * @param params array of params
     * @example sql -> SELECT * FROM users WHERE id = ? , name = ? ; params-> [id, '1']
     */
    query(sql: string, params: Array<string | number>): Promise<DatabaseResponse> {

        this.createConnection();

        return Promise((resolve, reject) => {

            this._connection.query(sql, params, (err: mysql.MysqlError, rows: any[], fields: mysql.FieldInfo[]) => {
                this.closeConnection();

                if (err) {
                    reject(this._database.handleError(err));
                }

                resolve({ rows: rows, fields: fields });
            });

        });
    }
}