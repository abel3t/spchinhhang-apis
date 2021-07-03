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
exports.AddProductCategoryDto = exports.CreateProductDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateProductDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, type: { required: true, type: () => String }, shortDescription: { required: true, type: () => String }, description: { required: true, type: () => String }, price: { required: true, type: () => String }, oldPrice: { required: false, type: () => String }, photos: { required: true, type: () => [String] } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: 'Laptop HP Envy 13-ba1027TU 2K0B1PA',
        description: 'The name of product'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'Laptop',
        description: 'The type of product'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "type", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'Core i5-1135G7/ 8GB DDR4 3200MHz (Onboard)/ 256GB PCIe NVMe M.2/ 13.3 FHD IPS/ Win10',
        description: 'Short description'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "shortDescription", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'CPU: Intel Core i5-1135G7 2.4GHz up to 4.2GHz 8MB ',
        description: 'Full description'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '21.199.000',
        description: 'The price of product'
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '22.199.000',
        description: 'The old price of product'
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "oldPrice", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: [
            'https://salt.tikicdn.com/cache/w64/ts/product/10/b0/91/6329969c3fce448f92114968db420fa7.jpg'
        ],
        description: 'The photos of product'
    }),
    class_validator_1.IsArray(),
    class_validator_1.ArrayMinSize(1),
    class_validator_1.ArrayMaxSize(99),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "photos", void 0);
exports.CreateProductDto = CreateProductDto;
class AddProductCategoryDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { productId: { required: true, type: () => String }, categoryId: { required: true, type: () => String } };
    }
}
__decorate([
    swagger_1.ApiProperty({
        example: '60bdbbf92339455d3d5f84d7',
        description: 'The ObjectID of product'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], AddProductCategoryDto.prototype, "productId", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '60bdbbf92339455d3d5f84d8',
        description: 'The ObjectID of category'
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], AddProductCategoryDto.prototype, "categoryId", void 0);
exports.AddProductCategoryDto = AddProductCategoryDto;
//# sourceMappingURL=product.dto.js.map