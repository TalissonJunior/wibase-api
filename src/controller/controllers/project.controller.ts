import { Response, Controller, Get, Delete, Put, Post, Body, Params } from '@decorators/express';
import { ProjectBusiness } from '../../business/rules/project.business';
import { ProjectRepository } from '../../repository/repositories/project.repository';

@Controller('/api/wibase/project')
export class ProjectController {

  business: ProjectBusiness;
  constructor() { 
    this.business = new ProjectBusiness(new ProjectRepository());
  }

  // @description List all projects
  @Get('/')
  ListAll(@Response() res) {
    res.send(this.business.ListAll());
  }

  // @description Get project by id
  @Get('/:id')
  GetByID(@Response() res, @Params('id') id: number) {
    res.send("value");
  }

  // @description Create new project
  @Post('/')
  Insert(@Response() res, @Body() model: any) {
    res.send({ model: 'model' });
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