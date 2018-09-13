import { ProjectRepository } from "../../repository/repositories/project.repository";

export class ProjectBusiness {

    constructor(private repository: ProjectRepository){ }

    ListAll() {
       return this.repository.listAll();
    }
}