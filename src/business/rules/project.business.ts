import * as shortid from 'shortid';
import { ProjectRepository } from "../../repository/repositories/project.repository";
import { Project } from "../../models";
import { CreateAtUpdateAtDateField } from '../decorators';
import { Promise } from 'q';

export class ProjectBusiness {

    constructor(private repository: ProjectRepository){ }

    GetAll(): Q.Promise<any> {
       return this.repository.GetAll();
    }

    @CreateAtUpdateAtDateField
    Insert(model: Project): Q.Promise<any>  {

        model.public_id = model.name + shortid.generate();

        return this.repository.insert(model);
    }
}