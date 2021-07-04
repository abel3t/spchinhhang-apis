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
exports.CategoryController = void 0;
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
const category_dto_1 = require("./category.dto");
const category_service_1 = require("./category.service");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    createNewCategory(currentUser, categoryDto) {
        return this.categoryService.createNewCategory(currentUser.id, categoryDto);
    }
    updateCategory(currentUser, categoryId, categoryDto) {
        return this.categoryService.updateCategory({
            userId: currentUser.id,
            categoryId,
            categoryDto
        });
    }
    deleteCategory(currentUser, categoryId) {
        return this.categoryService.deleteCategory(currentUser.id, categoryId);
    }
    getAllCategories(paginationOptions) {
        return this.categoryService.getAllCategories(paginationOptions);
    }
};
__decorate([
    common_1.Post(),
    roles_decorator_1.Roles(constant_1.Role.ADMIN),
    common_1.UseGuards(new auth_guard_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Create a new category'
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, user_decorator_1.CurrentUser()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createNewCategory", null);
__decorate([
    common_1.Put(':categoryId'),
    roles_decorator_1.Roles(constant_1.Role.ADMIN),
    common_1.UseGuards(new auth_guard_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Update a category'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, user_decorator_1.CurrentUser()),
    __param(1, common_1.Param('categoryId')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    common_1.Delete(':categoryId'),
    roles_decorator_1.Roles(constant_1.Role.ADMIN),
    common_1.UseGuards(new auth_guard_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Delete a category'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, user_decorator_1.CurrentUser()),
    __param(1, common_1.Param('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Get all categories'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, paging_decorator_1.PaginationParams({ maxLimit: constant_1.DEFAULT_MAX_LIMIT })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAllCategories", null);
CategoryController = __decorate([
    common_1.Controller('categories'),
    swagger_1.ApiTags('Categories'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map