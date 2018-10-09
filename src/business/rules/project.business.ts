import { ProjectRepository } from '../../repository/repositories/project.repository';
import { BaseBusiness } from './base.business';
import { CreateAtUpdateAtDateField } from '../decorators';

export class ProjectBusiness extends BaseBusiness<ProjectRepository> {

    constructor(repository: ProjectRepository) {
        super(repository);
    }

    findAllCategories(): Promise<any> {
        return this.repository.find('category');
    }

    @CreateAtUpdateAtDateField
    insertProject(model: any){
        return this.repository.insert('project', model);
    }

    listAllProjects(){
        return this.repository.find('project');
    }

}