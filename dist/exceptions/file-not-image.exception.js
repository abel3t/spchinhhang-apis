"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileNotImageException = void 0;
const common_1 = require("@nestjs/common");
class FileNotImageException extends common_1.BadRequestException {
    constructor(message, error) {
        if (message) {
            super(message, error);
        }
        else {
            super('error.file.not_image');
        }
    }
}
exports.FileNotImageException = FileNotImageException;
//# sourceMappingURL=file-not-image.exception.js.map