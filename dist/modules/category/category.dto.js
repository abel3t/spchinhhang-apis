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
exports.CreateCategoryDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCategoryDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, type: { required: true, type: () => String }, description: { required: true, type: () => String }, parentId: { required: true, type: () => String }, photo: { required: true, type: () => String }, path: { required: true, type: () => String } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'Laptop HP',
        description: 'The name of category'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'Laptop',
        description: 'The type of category'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "type", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'Laptop HP like new',
        description: 'Description'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '60bdbbf92339455d3d5f84d7',
        description: 'The parentId of category'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "parentId", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'https://salt.tikicdn.com/cache/w64/ts/product/10/b0/91/6329969c3fce448f92114968db420fa7.jpg',
        description: 'The photo of category'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "photo", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: ',60bdbbf92339455d3d5f84d7,',
        description: 'The path of category'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "path", void 0);
exports.CreateCategoryDto = CreateCategoryDto;
//# sourceMappingURL=category.dto.js.map