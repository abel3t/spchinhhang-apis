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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constant_1 = require("../../common/constant");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const user_decorator_1 = require("../../decorators/user.decorator");
const auth_guard_1 = require("../../guards/auth.guard");
const roles_guard_1 = require("../../guards/roles.guard");
const ICurrentUser_1 = require("../../interfaces/ICurrentUser");
const auth_service_1 = require("./auth.service");
const user_dto_1 = require("./user.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    getProfile(user) {
        return this.authService.getProfile(user.id);
    }
    adminSignup(userDto) {
        return this.authService.adminSignUp(userDto);
    }
    adminSignIn(userDto) {
        return this.authService.adminSignIn(userDto);
    }
    adminSignout(email) {
        return this.authService.adminSignout(email);
    }
};
__decorate([
    common_1.Get('profile'),
    roles_decorator_1.Roles(constant_1.Role.ADMIN, constant_1.Role.USER),
    common_1.UseGuards(new auth_guard_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    swagger_1.ApiOperation({ summary: 'Get user profile' }),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Get profile'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, user_decorator_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    common_1.Post('admin/signup'),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Get profile'
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserSignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminSignup", null);
__decorate([
    common_1.Post('admin/signin'),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Admin signIn'
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserSignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminSignIn", null);
__decorate([
    common_1.Post('admin/signout'),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Admin signOut'
    }),
    openapi.ApiResponse({ status: 201, type: Boolean }),
    __param(0, common_1.Body('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Boolean)
], AuthController.prototype, "adminSignout", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    swagger_1.ApiTags('Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map