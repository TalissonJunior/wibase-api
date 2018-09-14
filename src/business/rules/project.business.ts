import * as shortid from 'shortid';
import { ProjectRepository } from "../../repository/repositories/project.repository";
import { Project } from "../../models";
import { CreateAtUpdateAtDateField } from '../decorators';

export class ProjectBusiness {

    constructor(private repository: ProjectRepository){ }

    listAll(): Q.Promise<any> {
       return this.repository.ListAll();
    }

    @CreateAtUpdateAtDateField
    Insert(model: Project): Q.Promise<any>  {

        model.public_id = model.name + shortid.generate();

        return this.repository.Insert(model);
    }
}