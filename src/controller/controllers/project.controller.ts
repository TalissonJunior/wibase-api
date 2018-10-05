import { Response, Controller, Get } from '@decorators/express';
import { ProjectBusiness } from '../../business/rules';
import { ProjectRepository } from '../../repository/repositories';

@Controller('/console/')
export class ProjectController {
  projectBusiness: ProjectBusiness;

  constructor() {
    this.projectBusiness = new ProjectBusiness(new ProjectRepository());
  }

  @Get('/category')
  findAllCartegories(@Response() res) {
    res.send(this.projectBusiness.findAllCategories());
  }

}