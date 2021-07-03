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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const constant_1 = require("../../common/constant");
const mongodb_1 = require("mongodb");
const user_entity_1 = require("../../shared/entities/user.entity");
const user_repository_1 = require("../../shared/repositories/user.repository");
const cognito_service_1 = require("../../shared/services/cognito.service");
let AuthService = class AuthService {
    constructor(userRepository, cognitoService) {
        this.userRepository = userRepository;
        this.cognitoService = cognitoService;
    }
    getProfile(id) {
        return this.userRepository.findOne({ _id: mongodb_1.ObjectID(id) });
    }
    adminSignUp(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, photo, password } = userDto;
            const role = constant_1.Role.ADMIN;
            yield this.cognitoService.signUp({
                email,
                password,
                role
            });
            const user = yield this.userRepository.save(new user_entity_1.User({
                name,
                email,
                photo,
                role: constant_1.Role.ADMIN
            }));
            yield this.cognitoService.updateUserCognitoAttributes(email, [
                {
                    Name: 'custom:id',
                    Value: `${user._id}`
                }
            ]);
            return true;
        });
    }
    adminSignIn(userDto) {
        return this.cognitoService.signIn(userDto.email, userDto.password);
    }
    adminSignout(email) {
        this.cognitoService.signOut(email);
        return true;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        cognito_service_1.CognitoService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map