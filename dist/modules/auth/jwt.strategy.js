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
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const ICurrentUser_1 = require("../../interfaces/ICurrentUser");
const jwks_rsa_1 = require("jwks-rsa");
const passport_jwt_1 = require("passport-jwt");
const config_1 = __importDefault(require("../../config"));
let JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor() {
        const authConfig = {
            userPoolId: config_1.default.AWS_COGNITO_USER_POOL_ID,
            clientId: config_1.default.AWS_COGNITO_APP_CLIENT_ID,
            region: config_1.default.AWS_COGNITO_REGION,
            authority: `https://cognito-idp.${config_1.default.AWS_COGNITO_REGION}.amazonaws.com/${config_1.default.AWS_COGNITO_USER_POOL_ID}`
        };
        super({
            secretOrKeyProvider: jwks_rsa_1.passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${authConfig.authority}/.well-known/jwks.json`
            }),
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: authConfig.clientId,
            issuer: authConfig.authority,
            algorithms: ['RS256']
        });
    }
    validate(payload) {
        return {
            id: payload['custom:id'],
            email: payload.email,
            role: payload['custom:role']
        };
    }
};
JwtStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map