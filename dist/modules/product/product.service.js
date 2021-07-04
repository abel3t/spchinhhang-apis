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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../common/utils");
const paging_decorator_1 = require("../../decorators/paging.decorator");
const product_entity_1 = require("../../shared/entities/product.entity");
const product_repesitory_1 = require("../../shared/repositories/product.repesitory");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    createNewProduct(userId, productDto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.save(new product_entity_1.Product(Object.assign(Object.assign({}, productDto), { createdBy: userId })));
            return true;
        });
    }
    updateProduct({ userId, productId, productDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.findOneAndUpdate({ _id: utils_1.toObjectId(productId), isActive: true }, {
                $set: Object.assign({ updatedBy: userId, updatedAt: utils_1.unixTime() }, productDto)
            });
            return true;
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.deleteOne({ _id: utils_1.toObjectId(productId) });
            return true;
        });
    }
    addProductCategory(userId, { productId, categoryId }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.findOneAndUpdate({
                _id: utils_1.toObjectId(productId)
            }, {
                $push: {
                    categories: {
                        categoryId,
                        isFeatured: false
                    }
                },
                $set: {
                    UpdatedBy: userId,
                    updatedAt: utils_1.unixTime()
                }
            });
            return true;
        });
    }
    removeProductCategory(userId, { productId, categoryId }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.findOneAndUpdate({
                _id: utils_1.toObjectId(productId)
            }, {
                $pull: {
                    categories: {
                        categoryId
                    }
                },
                $set: {
                    updatedBy: userId,
                    updatedAt: utils_1.unixTime()
                }
            });
            return true;
        });
    }
    getAllProducts(paginationOptions) {
        return this.productRepository.paginate(paginationOptions);
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [product_repesitory_1.ProductRepository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map