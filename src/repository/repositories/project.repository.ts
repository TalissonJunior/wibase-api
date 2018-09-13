import * as mysql from 'mysql';
import { BaseRepository } from './base.repository';

export class ProjectRepository extends BaseRepository {

    constructor() {
        super();
    }

    listAll() {
        return this.query('SELECT * FROM project', null).then((response) => {
           return response.rows;
        })
        .catch((error: BaseErrorResponse ) => {
           return error;
        })
    }
}