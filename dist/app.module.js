"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const auth_module_1 = require("./modules/auth/auth.module");
const jwt_strategy_1 = require("./modules/auth/jwt.strategy");
const category_module_1 = require("./modules/category/category.module");
const product_module_1 = require("./modules/product/product.module");
const shared_module_1 = require("./shared/shared.module");
const app_controller_1 = require("./app.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            shared_module_1.SharedModule,
            auth_module_1.AuthModule,
            product_module_1.ProductModule,
            category_module_1.CategoryModule,
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 10
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [jwt_strategy_1.JwtStrategy]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map