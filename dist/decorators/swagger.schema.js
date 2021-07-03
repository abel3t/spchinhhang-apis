"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFile = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("@nestjs/common/constants");
const route_paramtypes_enum_1 = require("@nestjs/common/enums/route-paramtypes.enum");
const swagger_1 = require("@nestjs/swagger");
const reverse_object_keys_util_1 = require("@nestjs/swagger/dist/utils/reverse-object-keys.util");
const IApiFile_1 = require("../interfaces/IApiFile");
const lodash_1 = require("lodash");
function explore(instance, propertyKey) {
    const types = Reflect.getMetadata(constants_1.PARAMTYPES_METADATA, instance, propertyKey);
    const routeArgsMetadata = Reflect.getMetadata(constants_1.ROUTE_ARGS_METADATA, instance.constructor, propertyKey) || {};
    const parametersWithType = lodash_1.mapValues(reverse_object_keys_util_1.reverseObjectKeys(routeArgsMetadata), (param) => ({
        type: types[param.index],
        name: param.data,
        required: true
    }));
    for (const [key, value] of Object.entries(parametersWithType)) {
        const keyPair = key.split(':');
        if (Number(keyPair[0]) === route_paramtypes_enum_1.RouteParamtypes.BODY) {
            return value.type;
        }
    }
}
const registerModel = (target, propertyKey, descriptor) => {
    const body = explore(target, propertyKey);
    return body && swagger_1.ApiExtraModels(body)(target, propertyKey, descriptor);
};
const RegisterModels = () => registerModel;
const ApiFileDecorator = (files = [], options = {}) => (target, propertyKey, descriptor) => {
    const { isRequired = false } = options;
    const fileSchema = {
        type: 'string',
        format: 'binary'
    };
    let properties = {};
    if (files) {
        properties = files.reduce((filesMap, file) => {
            if (file === null || file === void 0 ? void 0 : file.isArray) {
                filesMap[file.name] = {
                    type: 'array',
                    items: fileSchema
                };
            }
            else {
                filesMap[file.name] = fileSchema;
            }
            return filesMap;
        }, {});
    }
    let schema = {
        properties,
        type: 'object'
    };
    const body = explore(target, propertyKey);
    if (body) {
        schema = {
            allOf: [
                {
                    $ref: swagger_1.getSchemaPath(body)
                },
                { properties, type: 'object' }
            ]
        };
    }
    return swagger_1.ApiBody({
        schema,
        required: isRequired
    })(target, propertyKey, descriptor);
};
const ApiFile = (files = [], options = {}) => common_1.applyDecorators(RegisterModels(), ApiFileDecorator(files, options));
exports.ApiFile = ApiFile;
//# sourceMappingURL=swagger.schema.js.map