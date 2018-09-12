import { Response, Controller, Get, Delete, Put, Post, Body, Params } from '@decorators/express';

@Controller('/api/project')
export class ProjectController {

  constructor() { }

  // @description List all projects
  @Get('/')
  ListAll(@Response() res) {
    res.send(["value1", "value2"]);
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