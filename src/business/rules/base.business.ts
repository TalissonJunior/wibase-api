import { BaseRepository } from "../../repository/repositories/base.repository";

export class BaseBusiness<TRepository extends BaseRepository> {

    constructor(protected repository: TRepository) { }

    createCollection(collectionName: string): Promise<any> {
        return this.repository.createCollection(collectionName);
    }

    insert(model: any): Promise<any> {
        
        var collectionName = model.collectionName;
        delete model.collectionName;

        return this.repository.insert(collectionName, model);
    }

} 