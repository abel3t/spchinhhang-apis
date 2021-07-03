"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoService = void 0;
const common_1 = require("@nestjs/common");
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = __importDefault(require("../../config"));
let CognitoService = class CognitoService {
    constructor() {
        this.logger = new common_1.Logger('CognitoService');
        const { AWS_MY_ACCESS_KEY_ID, AWS_MY_SECRET_KEY, AWS_COGNITO_REGION, AWS_COGNITO_USER_POOL_ID, AWS_COGNITO_APP_CLIENT_ID } = config_1.default;
        this.userPool = new amazon_cognito_identity_js_1.CognitoUserPool({
            UserPoolId: AWS_COGNITO_USER_POOL_ID,
            ClientId: AWS_COGNITO_APP_CLIENT_ID
        });
        aws_sdk_1.default.config.update({
            accessKeyId: AWS_MY_ACCESS_KEY_ID,
            secretAccessKey: AWS_MY_SECRET_KEY,
            region: AWS_COGNITO_REGION
        });
    }
    signUp({ email, password, role }) {
        const attributeList = [
            new amazon_cognito_identity_js_1.CognitoUserAttribute({
                Name: 'email',
                Value: email
            }),
            new amazon_cognito_identity_js_1.CognitoUserAttribute({
                Name: 'custom:role',
                Value: role
            }),
            new amazon_cognito_identity_js_1.CognitoUserAttribute({
                Name: 'custom:id',
                Value: '0'
            })
        ];
        return new Promise((resolve, reject) => this.userPool.signUp(email, password, attributeList, undefined, (error, result) => {
            if (error === null || error === void 0 ? void 0 : error.message) {
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
                UserPoolId: config_1.default.AWS_COGNITO_USER_POOL_ID,
                Username: email
            };
            this.updateUserCognitoAttributes(email, [
                {
                    Name: 'email_verified',
                    Value: 'true'
                }
            ]).catch((error_) => {
                throw new common_1.BadRequestException(error_);
            });
            new aws_sdk_1.default.CognitoIdentityServiceProvider().adminConfirmSignUp(confirmParams, (err) => {
                var _a, _b;
                if (err === null || err === void 0 ? void 0 : err.message) {
                    return reject(err);
                }
                if ((_b = (_a = event.request) === null || _a === void 0 ? void 0 : _a.userAttributes) === null || _b === void 0 ? void 0 : _b.hasOwnProperty('email')) {
                    event.response.autoVerifyEmail = true;
                }
                resolve(result);
            });
        }));
    }
    signIn(email, password) {
        const authenticationDetails = new amazon_cognito_identity_js_1.AuthenticationDetails({
            Username: email,
            Password: password
        });
        const userData = {
            Username: email,
            Pool: this.userPool
        };
        const cognitoUser = new amazon_cognito_identity_js_1.CognitoUser(userData);
        return new Promise((resolve, reject) => cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                common_1.Logger.log('Login successfully!');
                resolve({
                    token: result.getIdToken().getJwtToken(),
                    accessToken: result.getAccessToken().getJwtToken(),
                    refreshToken: result.getRefreshToken().getToken()
                });
            },
            onFailure(err) {
                reject(err);
            }
        })).catch((error) => {
            throw new common_1.BadRequestException(error);
        });
    }
    refreshToken(email, refreshToken) {
        const token = new amazon_cognito_identity_js_1.CognitoRefreshToken({ RefreshToken: refreshToken });
        const cognitoUser = new amazon_cognito_identity_js_1.CognitoUser({
            Username: email,
            Pool: this.userPool
        });
        return new Promise((resolve, reject) => cognitoUser.refreshSession(token, (error, session) => {
            if (error) {
                reject(error);
            }
            else {
                common_1.Logger.log('Refresh token successfully!');
                resolve({
                    token: session.idToken.jwtToken,
                    accessToken: session.accessToken.jwtToken,
                    refreshToken: session.refreshToken.token
                });
            }
        }));
    }
    signOut(email) {
        const cognitoUser = new amazon_cognito_identity_js_1.CognitoUser({
            Username: email,
            Pool: this.userPool
        });
        cognitoUser.signOut();
        return true;
    }
    updateUserCognitoAttributes(email, attributes) {
        return new Promise((resolve, reject) => {
            new aws_sdk_1.default.CognitoIdentityServiceProvider().adminUpdateUserAttributes({
                UserAttributes: attributes,
                UserPoolId: config_1.default.AWS_COGNITO_USER_POOL_ID,
                Username: email
            }, (error) => {
                if (error === null || error === void 0 ? void 0 : error.message) {
                    reject(error);
                }
                else {
                    common_1.Logger.log(`Updated attribute ${JSON.stringify(attributes)}`, 'updateUserCognitoAttributes');
                    resolve(true);
                }
            });
        });
    }
    deleteUser(email) {
        return new Promise((resolve, reject) => {
            new aws_sdk_1.default.CognitoIdentityServiceProvider().adminDeleteUser({
                UserPoolId: config_1.default.AWS_COGNITO_USER_POOL_ID,
                Username: email
            }, (error) => {
                if (error === null || error === void 0 ? void 0 : error.message) {
                    reject(error);
                }
                else {
                    common_1.Logger.log('Successfully', 'deleteUserCognito');
                    resolve(true);
                }
            });
        });
    }
};
CognitoService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], CognitoService);
exports.CognitoService = CognitoService;
//# sourceMappingURL=cognito.service.js.map