import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

import config from '../../config';
import { ICurrentUser } from '../../interfaces/ICurrentUser';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const authConfig = {
      userPoolId: config.AWS_COGNITO_USER_POOL_ID,
      clientId: config.AWS_COGNITO_APP_CLIENT_ID,
      region: config.AWS_COGNITO_REGION,
      authority: `https://cognito-idp.${config.AWS_COGNITO_REGION}.amazonaws.com/${config.AWS_COGNITO_USER_POOL_ID}`
    };

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${authConfig.authority}/.well-known/jwks.json`
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: authConfig.clientId,
      issuer: authConfig.authority,
      algorithms: ['RS256']
    });
  }

  public validate(payload: IPayload): ICurrentUser {
    return {
      id: payload['custom:id'],
      email: payload.email,
      role: payload['custom:role']
    };
  }
}

interface IPayload {
  email: string;
  ['custom:id']: string;
  ['custom:role']: string;
}
