import { Response, Controller, Get, Delete, Put, Post, Body, Params } from '@decorators/express';
import { WibaseBusiness } from '../../business/rules';
import { WibaseRepository } from '../../repository/repositories';
import { httpEventEmitter } from '../../business/const/http-event-emitter.const';

@Controller('/wibase')
export class WibaseController {
  business: WibaseBusiness;

  constructor() {
    this.business = new WibaseBusiness(new WibaseRepository());
  }

  @Post('/')
  Insert(@Response() res, @Body() model: any) {
    res.send(this.business.insert(model));
    httpEventEmitter.emit('post');
  }

}