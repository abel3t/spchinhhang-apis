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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsS3Service = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const mime_types_1 = __importDefault(require("mime-types"));
const generator_service_1 = require("./generator.service");
let AwsS3Service = class AwsS3Service {
    constructor(generatorService) {
        this.generatorService = generatorService;
        const awsS3Config = {};
        const options = {
            apiVersion: awsS3Config.bucketApiVersion,
            region: awsS3Config.bucketRegion
        };
        if (awsS3Config.accessKeyId && awsS3Config.secretAccessKey) {
            options.credentials = awsS3Config;
        }
        this.s3 = new aws_sdk_1.default.S3(options);
    }
    uploadImage(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = this.generatorService.fileName(mime_types_1.default.extension(file.mimetype));
            const key = 'images/' + fileName;
            yield this.s3
                .putObject({
                Bucket: '',
                Body: file.buffer,
                ACL: 'public-read',
                Key: key
            })
                .promise();
            return key;
        });
    }
};
AwsS3Service = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [generator_service_1.GeneratorService])
], AwsS3Service);
exports.AwsS3Service = AwsS3Service;
//# sourceMappingURL=aws-s3.service.js.map