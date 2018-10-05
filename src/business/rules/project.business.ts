import { ProjectRepository } from '../../repository/repositories/project.repository';
import { BaseBusiness } from './base.business';

export class ProjectBusiness extends BaseBusiness<ProjectRepository> {

    constructor(repository: ProjectRepository) {
        super(repository);
    }

    findAllCategories(): Promise<any> {
        return this.repository.find('category');
    }

}