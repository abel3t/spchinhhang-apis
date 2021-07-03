"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationParams = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constant_1 = require("../common/constant");
exports.PaginationParams = common_1.createParamDecorator((data, ctx) => {
    data = data ? data : { maxLimit: constant_1.DEFAULT_MAX_LIMIT };
    const request = ctx.switchToHttp().getRequest();
    const queries = request.query;
    queries.page = queries.page || 1;
    queries.limit = queries.limit || (data === null || data === void 0 ? void 0 : data.maxLimit) || constant_1.DEFAULT_MAX_LIMIT;
    if ((data === null || data === void 0 ? void 0 : data.maxLimit) && queries.limit > (data === null || data === void 0 ? void 0 : data.maxLimit)) {
        queries.limit = data === null || data === void 0 ? void 0 : data.maxLimit;
    }
    return {
        page: +queries.page || 1,
        limit: +queries.limit || constant_1.DEFAULT_MAX_LIMIT
    };
}, [
    (target, key) => {
        swagger_1.ApiQuery({
            name: 'page',
            schema: { default: 1, type: 'number', minimum: 1 },
            required: false
        })(target, key, Object.getOwnPropertyDescriptor(target, key));
        swagger_1.ApiQuery({
            name: 'limit',
            schema: { default: constant_1.DEFAULT_MAX_LIMIT, type: 'number', minimum: 1 },
            required: false
        })(target, key, Object.getOwnPropertyDescriptor(target, key));
    }
]);
//# sourceMappingURL=paging.decorator.js.map