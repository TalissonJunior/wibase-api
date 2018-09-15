import { BaseRepository } from './base.repository';

export class CategoryRepository extends BaseRepository {

    constructor() {
        super();
    }

    GetAll(): Q.Promise<any> {
        return this.query('SELECT * FROM category', null).then((response) => {
            return response.rows;
        })
        .catch((error) => {
            return error;
        })
    }
}