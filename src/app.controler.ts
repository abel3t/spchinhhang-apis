import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Root')
export class AppControler {
  constructor() {}
  @Get()
  @ApiResponse({
    status: 201,
    description: 'Root'
  })
  getProfile(): unknown {
    return { status: 'OK' };
  }
}
