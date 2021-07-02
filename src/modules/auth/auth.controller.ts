import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UserSignInDto, UserSignUpDto } from './user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('profile')
  @ApiResponse({
    status: 200,
    description: 'Get profile'
  })
  getProfile(): Promise<unknown> {
    const id = 'string';
    return this.authService.getProfile(id);
  }

  // region Admin
  @Post('admin/signup')
  @ApiResponse({
    status: 201,
    description: 'Get profile'
  })
  adminSignup(@Body() userDto: UserSignUpDto): Promise<unknown> {
    return this.authService.adminSignUp(userDto);
  }

  @Post('admin/signin')
  @ApiResponse({
    status: 201,
    description: 'Admin signIn'
  })
  adminSignIn(@Body() userDto: UserSignInDto): Promise<unknown> {
    return this.authService.adminSignIn(userDto);
  }

  @Post('admin/signout')
  @ApiResponse({
    status: 201,
    description: 'Admin signOut'
  })
  adminSignout(@Body('email') email: string): boolean {
    return this.authService.adminSignout(email);
  }

  // endregion
}
