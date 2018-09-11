import { Response, Controller, Get } from '@decorators/express';

@Controller('/project')
export class ProjectController {

  constructor() { }

  @Get('/')
  Get(@Response() res) {
    res.send({
      body: 'teste'
    });
  }

  @Get('/:id')
  GetByID(@Response() res) {
    res.send(['oii']);
  }

}