import { Response, Controller, Get } from '@decorators/express';
import { CategoryBusiness } from '../../business/rules';
import { CategoryRepository } from '../../repository/repositories';

@Controller('/api/wibase/console/category')
export class CategoryController {

  business: CategoryBusiness;
  constructor() { 
    this.business = new CategoryBusiness(new CategoryRepository());
  }

  // List all categories
  @Get('/')
  GetAll(@Response() res) {
    res.send(this.business.GetAll());
  }

}