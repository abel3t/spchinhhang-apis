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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSignInDto = exports.UserSignUpDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UserSignUpDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, photo: { required: true, type: () => String } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'Abel Tran',
        description: 'The name of user'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserSignUpDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'abeltran.develop@gmail.com',
        description: 'The email of user'
    }),
    class_validator_1.IsEmail(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserSignUpDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '12345@bC',
        description: 'User password'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserSignUpDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'https://...',
        description: 'The photoUrl of user'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserSignUpDto.prototype, "photo", void 0);
exports.UserSignUpDto = UserSignUpDto;
class UserSignInDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String }, password: { required: true, type: () => String } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'abeltran.develop@gmail.com',
        description: 'The email of user'
    }),
    class_validator_1.IsEmail(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserSignInDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '12345@bC',
        description: 'User password'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserSignInDto.prototype, "password", void 0);
exports.UserSignInDto = UserSignInDto;
//# sourceMappingURL=user.dto.js.map