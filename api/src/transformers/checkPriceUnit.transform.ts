import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { QuoteCreateDto } from 'src/modules/quote/dto/quote-create.dto';

@ValidatorConstraint({ name: 'CheckPriceUnit', async: false })
export class CheckPriceUnit implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as QuoteCreateDto;
    const price = object.price;
    const priceUnit = object.price_unit;

    // Nếu price có mà price_unit không có hoặc ngược lại thì trả về false
    if ((price && !priceUnit) || (!price && priceUnit)) {
      return false;
    }

    // Cả hai đều không có hoặc cả hai đều có thì hợp lệ
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    console.log({ args });

    return 'Both price and price_unit must either be present or absent.';
  }
}
