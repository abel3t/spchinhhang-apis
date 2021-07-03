"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const common_1 = require("@nestjs/common");
const database_provider_1 = require("./database.provider");
const repositories_provider_1 = require("./repositories.provider");
const aws_s3_service_1 = require("./services/aws-s3.service");
const cognito_service_1 = require("./services/cognito.service");
const generator_service_1 = require("./services/generator.service");
const validator_service_1 = require("./services/validator.service");
const providers = [
    ...database_provider_1.DatabaseProvider,
    ...repositories_provider_1.RepositoriesProvider,
    validator_service_1.ValidatorService,
    aws_s3_service_1.AwsS3Service,
    generator_service_1.GeneratorService,
    cognito_service_1.CognitoService
];
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    common_1.Global(),
    common_1.Module({
        providers,
        imports: [common_1.HttpModule],
        exports: [...providers, ...repositories_provider_1.repositories, common_1.HttpModule, database_provider_1.MONGO_CONNECTION]
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map