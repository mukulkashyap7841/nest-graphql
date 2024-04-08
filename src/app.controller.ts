import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() { }

  @Get("")
  index(){
    return {
      status:HttpStatus.OK,
      message:"Application is healthy"
    }
  }

}
