import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { CognitoService } from '../../shared/services/cognito.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [AuthController],
  providers: [AuthService, CognitoService],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' }), AuthService]
})
export class AuthModule {}
