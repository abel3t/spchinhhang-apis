import { Injectable } from '@nestjs/common';
import { Role } from 'common/constant';
import { User } from 'shared/entities/user.entity';
import { UserRepository } from 'shared/repositories/user.repository';
import { CognitoService } from 'shared/services/cognito.service';

import { UserSignInDto, UserSignUpDto } from './user.dto';
import { toObjectId } from 'common/utils';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private cognitoService: CognitoService
  ) {}

  // region User APIs
  getProfile(id: string): Promise<unknown> {
    return this.userRepository.findOne({ _id: toObjectId(id) });
  }
  // endregion

  // region Admin APIs
  async adminSignUp(userDto: UserSignUpDto): Promise<unknown> {
    const { email, name, photo, password } = userDto;
    const role = Role.ADMIN;

    await this.cognitoService.signUp({
      email,
      password,
      role
    });

    const user = await this.userRepository.save(
      new User({
        name,
        email,
        photo,
        role: Role.ADMIN
      })
    );

    await this.cognitoService.updateUserCognitoAttributes(email, [
      {
        Name: 'custom:id',
        Value: `${user._id}`
      }
    ]);

    return true;
  }

  adminSignIn(userDto: UserSignInDto): Promise<unknown> {
    return this.cognitoService.signIn(userDto.email, userDto.password);
  }

  adminSignout(email: string): boolean {
    this.cognitoService.signOut(email);
    return true;
  }

  // endregion
}
