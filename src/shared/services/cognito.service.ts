import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AuthenticationDetails,
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool
} from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
import { AttributeType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

@Injectable()
export class CognitoService {
  logger = new Logger('CognitoService');
  private readonly userPool: CognitoUserPool;

  constructor(private configService: ConfigService) {
    const AWS_ACCESS_KEY_ID = this.configService.get<string>(
      'AWS_MY_ACCESS_KEY_ID'
    );
    const AWS_SECRET_KEY = this.configService.get<string>('AWS_MY_SECRET_KEY');
    const AWS_COGNITO_REGION =
      this.configService.get<string>('AWS_COGNITO_REGION');
    const AWS_COGNITO_USER_POOL_ID = this.configService.get<string>(
      'AWS_COGNITO_USER_POOL_ID'
    );
    const AWS_COGNITO_APP_CLIENT_ID = this.configService.get<string>(
      'AWS_COGNITO_APP_CLIENT_ID'
    );

    this.userPool = new CognitoUserPool({
      UserPoolId: AWS_COGNITO_USER_POOL_ID,
      ClientId: AWS_COGNITO_APP_CLIENT_ID
    });

    AWS.config.update({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_KEY,
      region: AWS_COGNITO_REGION
    });
  }

  public signUp({ email, password, role }: IUser): Promise<unknown> {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      }),
      new CognitoUserAttribute({
        Name: 'custom:role',
        Value: role
      }),
      new CognitoUserAttribute({
        Name: 'custom:id',
        Value: '0' // default userId
      })
    ];

    return new Promise((resolve, reject) =>
      this.userPool.signUp(
        email,
        password,
        attributeList,
        undefined,
        (error, result) => {
          if (error?.message) {
            return reject(error);
          }

          const event = {
            request: {
              userAttributes: {
                email
              },
              validationData: {
                Name: 'email',
                Value: email
              }
            },
            response: {
              autoVerifyEmail: true
            }
          };

          const confirmParams = {
            UserPoolId: this.configService.get<string>(
              'AWS_COGNITO_USER_POOL_ID'
            ),
            Username: email
          };

          this.updateUserCognitoAttributes(email, [
            {
              Name: 'email_verified',
              Value: 'true'
            }
          ]).catch((error_) => {
            throw new BadRequestException(error_);
          });

          new AWS.CognitoIdentityServiceProvider().adminConfirmSignUp(
            confirmParams,
            (err) => {
              if (err?.message) {
                return reject(err);
              }

              // eslint-disable-next-line no-prototype-builtins
              if (event.request?.userAttributes?.hasOwnProperty('email')) {
                event.response.autoVerifyEmail = true;
              }

              resolve(result);
            }
          );
        }
      )
    );
  }

  public signIn(email: string, password: string): Promise<unknown> {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    });
    const userData = {
      Username: email,
      Pool: this.userPool
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) =>
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          Logger.log('Login successfully!');
          resolve({
            token: result.getIdToken().getJwtToken(),
            accessToken: result.getAccessToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken()
          });
        },
        onFailure(err) {
          reject(err);
        }
      })
    ).catch((error) => {
      throw new BadRequestException(error);
    });
  }

  public refreshToken(email: string, refreshToken: string): Promise<unknown> {
    const token = new CognitoRefreshToken({ RefreshToken: refreshToken });
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool
    });

    return new Promise((resolve, reject) =>
      cognitoUser.refreshSession(token, (error, session) => {
        if (error) {
          reject(error);
        } else {
          Logger.log('Refresh token successfully!');
          resolve({
            token: session.idToken.jwtToken,
            accessToken: session.accessToken.jwtToken,
            refreshToken: session.refreshToken.token
          });
        }
      })
    );
  }

  public signOut(email: string): boolean {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool
    });
    cognitoUser.signOut();
    return true;
  }

  public updateUserCognitoAttributes(
    email: string,
    attributes: AttributeType[]
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      new AWS.CognitoIdentityServiceProvider().adminUpdateUserAttributes(
        {
          UserAttributes: attributes,
          UserPoolId: this.configService.get<string>(
            'AWS_COGNITO_USER_POOL_ID'
          ),
          Username: email
        },
        (error) => {
          if (error?.message) {
            reject(error);
          } else {
            Logger.log(
              `Updated attribute ${JSON.stringify(attributes)}`,
              'updateUserCognitoAttributes'
            );
            resolve(true);
          }
        }
      );
    });
  }

  public deleteUser(email: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      new AWS.CognitoIdentityServiceProvider().adminDeleteUser(
        {
          UserPoolId: this.configService.get<string>(
            'AWS_COGNITO_USER_POOL_ID'
          ),
          Username: email
        },
        (error) => {
          if (error?.message) {
            reject(error);
          } else {
            Logger.log('Successfully', 'deleteUserCognito');
            resolve(true);
          }
        }
      );
    });
  }
}

interface IUser {
  email: string;
  password: string;
  role: string;
}
