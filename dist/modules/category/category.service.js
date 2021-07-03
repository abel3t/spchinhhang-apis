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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const paging_decorator_1 = require("../../decorators/paging.decorator");
const mongodb_1 = require("mongodb");
const category_entity_1 = require("../../shared/entities/category.entity");
const category_repository_1 = require("../../shared/repositories/category.repository");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    createNewCategory(categoryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            if (categoryDto.parentId) {
                const parentCategory = yield this.categoryRepository.findOne({
                    _id: mongodb_1.ObjectID(categoryDto.parentId)
                });
                if (!parentCategory) {
                    throw new common_1.BadRequestException('Invalid parentId');
                }
                categoryDto.path =
                    (parentCategory.path || ',') + `${parentCategory._id},`;
            }
            return this.categoryRepository.save(new category_entity_1.Category(categoryDto));
        });
    }
    getAllCategories(paginationOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.paginate(paginationOptions);
        });
    }
};
CategoryService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map