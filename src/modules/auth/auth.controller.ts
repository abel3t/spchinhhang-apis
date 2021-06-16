import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor() {}
  @Get('profile')
  @ApiResponse({
    status: 201,
    description: 'Get profile'
  })
  getProfile(): unknown {
    return { status: 'OK' };
  }
}
