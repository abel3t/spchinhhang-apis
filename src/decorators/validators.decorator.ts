import type { ValidationOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';

export function IsPassword(
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'isPassword',
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return /^[\d!#$%&*@A-Z^a-z]*$/.test(value);
        }
      }
    });
  };
}
