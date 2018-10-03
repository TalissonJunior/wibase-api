import { ProjectRepository } from '../../repository/repositories/project.repository';
import { BaseBusiness } from './base.business';

export class ProjectBusiness extends BaseBusiness<ProjectRepository> {

    constructor(repository: ProjectRepository){
        super(repository);
     }
}