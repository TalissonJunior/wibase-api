import { CategoryRepository } from "../../repository/repositories";

export class CategoryBusiness {

    constructor(private repository: CategoryRepository){ }

    GetAll(): Q.Promise<any> {
       return this.repository.GetAll();
    }
}