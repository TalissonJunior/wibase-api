import { Response, Controller, Get} from '@decorators/express';

@Controller('/')
export class ViewController {

  constructor() { }

  // Render index.ejs
  @Get('/')
  ListAll(@Response() res) {
    res.render('index', {
        title: 'Wibase',
        items: [
          {
            title: 'Getting started',
            description: 'Documentation.',
            colorClass: 'item-green',
            icon: 'fab fa-angellist'
          },
          {
            title: 'Project structure',
            description: 'The project structure documentation.',
            colorClass: 'item-orange',
            icon: 'fas fa-code'
          },
          {
            title: 'Compile & Build',
            description: 'The compile and build documentation.',
            colorClass: 'item-purple',
            icon: 'fas fa-wrench'
          },
          {
            title: 'Real time database',
            description: 'The real time database documentation.',
            colorClass: 'item-blue',
            icon: 'fas fa-database'
          },
          {
            title: 'License & Contributors',
            description: 'The license terms and contributors names.',
            colorClass: 'item-red',
            icon: 'fas fa-users'
          }
        ]
    });
  }


}