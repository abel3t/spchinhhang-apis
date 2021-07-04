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
exports.BaseEntity = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const mongodb_1 = require("mongodb");
const typeorm_1 = require("typeorm");
class BaseEntity {
    constructor(props) {
        Object.assign(this, props || {});
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { _id: { required: true, type: () => String }, createdBy: { required: false, type: () => String }, createdAt: { required: false, type: () => Number }, updatedBy: { required: false, type: () => String }, updatedAt: { required: false, type: () => Number }, isActive: { required: false, type: () => Boolean } };
    }
}
__decorate([
    typeorm_1.ObjectIdColumn(),
    class_transformer_1.Transform(({ value }) => mongodb_1.ObjectID(value).toHexString(), {
        toPlainOnly: true
    }),
    __metadata("design:type", String)
], BaseEntity.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], BaseEntity.prototype, "createdBy", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], BaseEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], BaseEntity.prototype, "updatedBy", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], BaseEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], BaseEntity.prototype, "isActive", void 0);
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=base.entity.js.map