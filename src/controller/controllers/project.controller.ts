import { Response, Controller, Get, Post, Body } from '@decorators/express';
import { ProjectBusiness } from '../../business/rules';
import { ProjectRepository } from '../../repository/repositories';
import { httpEventEmitter } from '../../business/const/http-event-emitter.const';

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

  @Post('/project')
  insertProject(@Response() res, @Body() model) {
    res.send(this.projectBusiness.insertProject(model));
    httpEventEmitter.emit('console');
  }

}