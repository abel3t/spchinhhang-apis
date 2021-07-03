"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let ErrorExceptionFilter = class ErrorExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        console.log(exception);
        if (exception instanceof common_1.HttpException) {
            const data = exception.getResponse();
            const err = {
                message: (data === null || data === void 0 ? void 0 : data.message) || data,
                errorCode: (data === null || data === void 0 ? void 0 : data.errorCode) || 1,
                statusCode: (data === null || data === void 0 ? void 0 : data.statusCode) || exception.getStatus(),
                timestamp: new Date().toISOString(),
                path: request.url
            };
            return response.status(err.statusCode).send(err);
        }
        const error = new Error(exception);
        response.status(common_1.HttpStatus.BAD_REQUEST).send({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            errorCode: 1,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: error === null || error === void 0 ? void 0 : error.message,
            stack: error.stack
        });
    }
};
ErrorExceptionFilter = __decorate([
    common_1.Catch()
], ErrorExceptionFilter);
exports.ErrorExceptionFilter = ErrorExceptionFilter;
//# sourceMappingURL=error.filter.js.map