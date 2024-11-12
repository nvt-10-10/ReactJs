import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

// Custom decorator to validate files
export function IsFileNotEmpty(validationOptions?: ValidationOptions) {
  return function (target: object, propertyName: string) {
    registerDecorator({
      name: 'isFileNotEmpty',
      target: target.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: Express.Multer.File[], args: ValidationArguments) {
          // If files are present, validate that they're not empty
          if (value && Array.isArray(value)) {
            return value.length > 0;
          }
          // If no files are present, that's okay (optional)
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must not be empty when files are uploaded`;
        },
      },
    });
  };
}
