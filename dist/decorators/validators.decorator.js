"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPassword = void 0;
const class_validator_1 = require("class-validator");
function IsPassword(validationOptions) {
    return (object, propertyName) => {
        class_validator_1.registerDecorator({
            propertyName,
            name: 'isPassword',
            target: object.constructor,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value) {
                    return /^[\d!#$%&*@A-Z^a-z]*$/.test(value);
                }
            }
        });
    };
}
exports.IsPassword = IsPassword;
//# sourceMappingURL=validators.decorator.js.map