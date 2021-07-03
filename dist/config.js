"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
const config = {
    PORT: process.env.PORT || 8080,
    UP_STAGE: process.env.UP_STAGE,
    DB_URI: process.env.DB_URI,
    AWS_MY_ACCESS_KEY_ID: process.env.AWS_MY_ACCESS_KEY_ID,
    AWS_MY_SECRET_KEY: process.env.AWS_MY_SECRET_KEY,
    AWS_COGNITO_REGION: process.env.AWS_COGNITO_REGION,
    AWS_COGNITO_USER_POOL_ID: process.env.AWS_COGNITO_USER_POOL_ID,
    AWS_COGNITO_APP_CLIENT_ID: process.env.AWS_COGNITO_APP_CLIENT_ID
};
exports.default = config;
//# sourceMappingURL=config.js.map