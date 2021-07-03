import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { Role } from 'common/constant';
import { Roles } from 'decorators/roles.decorator';
import { CurrentUser } from 'decorators/user.decorator';
import { AuthGuard } from 'guards/auth.guard';
import { RolesGuard } from 'guards/roles.guard';
import { ICurrentUser } from 'interfaces/ICurrentUser';

import { AuthService } from './auth.service';
import { UserSignInDto, UserSignUpDto } from './user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('profile')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(new AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Get user profile' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get profile'
  })
  getProfile(@CurrentUser() user: ICurrentUser): Promise<unknown> {
    return this.authService.getProfile(user.id);
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
