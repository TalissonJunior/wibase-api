import { Response, Controller, Get, Delete, Put, Post, Body, Params } from '@decorators/express';
import { ProjectBusiness } from '../../business/rules';
import { ProjectRepository } from '../../repository/repositories';

@Controller('/console')
export class ProjectController {
  projectBusiness: ProjectBusiness;

  constructor() {
    this.projectBusiness = new ProjectBusiness(new ProjectRepository());
  }
}