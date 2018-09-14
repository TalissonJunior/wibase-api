import { Response, Controller, Get, Delete, Put, Post, Body, Params } from '@decorators/express';
import { ProjectBusiness } from '../../business/rules/project.business';
import { ProjectRepository } from '../../repository/repositories/project.repository';
import { Project } from '../../models';

@Controller('/api/wibase/console/project')
export class ProjectController {

  business: ProjectBusiness;
  constructor() { 
    this.business = new ProjectBusiness(new ProjectRepository());
  }

  // List all projects
  @Get('/')
  ListAll(@Response() res) {
    res.send(this.business.listAll());
  }

   // Get project by id
  @Get('/:id')
  GetByID(@Response() res, @Params('id') id: number) {
    res.send("value");
  }

  // Create new project
  @Post('/')
  Insert(@Response() res, @Body() model: Project) {
    res.send(this.business.Insert(model));
  }

  // @description Update project by id
  @Put('/:id')
  Update(@Response() res, @Params('id') id: number, @Body() model: any) {
    res.send({ id: id, model: model });
  }

  // @description Delete project by id
  @Delete('/:id')
  Delete(@Response() res, @Params('id') id: number) {
    res.send({ id: id });
  }

}