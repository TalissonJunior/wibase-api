import { BaseRepository } from './base.repository';
import { Project } from '../../models';

export class ProjectRepository extends BaseRepository {

    constructor() {
        super();
    }

    ListAll(): Q.Promise<any> {
        return this.query('SELECT * FROM project', null).then((response) => {
            return response.rows;
        })
        .catch((error) => {
            return error;
        })
    }

    Insert(model: Project): Q.Promise<any> {
        return this.query('INSERT INTO project SET ?', model).then((response) => {
            return response.rows;
        })
        .catch((error: BaseErrorResponse) => {
            return error;
        })
    }
}