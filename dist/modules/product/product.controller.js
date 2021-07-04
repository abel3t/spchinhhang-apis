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
exports.ProductController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constant_1 = require("../../common/constant");
const paging_decorator_1 = require("../../decorators/paging.decorator");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const user_decorator_1 = require("../../decorators/user.decorator");
const auth_guard_1 = require("../../guards/auth.guard");
const roles_guard_1 = require("../../guards/roles.guard");
const ICurrentUser_1 = require("../../interfaces/ICurrentUser");
const product_dto_1 = require("./product.dto");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    createNewProduct(user, productDto) {
        return this.productService.createNewProduct(user.id, productDto);
    }
    updateProduct(user, productId, productDto) {
        return this.productService.updateProduct({
            userId: user.id,
            productId,
            productDto
        });
    }
    deleteProduct(productId) {
        return this.productService.deleteProduct(productId);
    }
    addProductCategory(user, productCategoryDto) {
        return this.productService.addProductCategory(user.id, productCategoryDto);
    }
    removeProductCategory(user, productCategoryDto) {
        return this.productService.removeProductCategory(user.id, productCategoryDto);
    }
    getAllProducts(paginationOptions) {
        return this.productService.getAllProducts(paginationOptions);
    }
};
__decorate([
    common_1.Post(),
    roles_decorator_1.Roles(constant_1.Role.ADMIN),
    common_1.UseGuards(new auth_guard_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Create a new product'
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, user_decorator_1.CurrentUser()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createNewProduct", null);
__decorate([
    common_1.Put(':productId'),
    roles_decorator_1.Roles(constant_1.Role.ADMIN),
    common_1.UseGuards(new auth_guard_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Update a product'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, user_decorator_1.CurrentUser()),
    __param(1, common_1.Param('productId')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    common_1.Delete(':productId'),
    roles_decorator_1.Roles(constant_1.Role.ADMIN),
    common_1.UseGuards(new auth_guard_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Delete a product'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    common_1.Put(':productId/categories/:categoryId'),
    roles_decorator_1.Roles(constant_1.Role.ADMIN),
    common_1.UseGuards(new auth_guard_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, user_decorator_1.CurrentUser()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, product_dto_1.AddProductCategoryDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "addProductCategory", null);
__decorate([
    common_1.Delete(':productId/categories/:categoryId'),
    roles_decorator_1.Roles(constant_1.Role.ADMIN),
    common_1.UseGuards(new auth_guard_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, user_decorator_1.CurrentUser()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, product_dto_1.AddProductCategoryDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "removeProductCategory", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Get all products'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, paging_decorator_1.PaginationParams({ maxLimit: constant_1.DEFAULT_MAX_LIMIT })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
ProductController = __decorate([
    common_1.Controller('products'),
    swagger_1.ApiTags('Products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map