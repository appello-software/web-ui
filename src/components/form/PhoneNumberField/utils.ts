import { CountryCode, isValidPhoneNumber } from 'libphonenumber-js';
import { parsePhoneNumber } from 'libphonenumber-js/max';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export function withPhoneNumberValidation({ defaultCountry }: { defaultCountry: CountryCode }) {
  return z
    .string()
    .refine(value => {
      if (!value) return true;
      return isValidPhoneNumber(value, { defaultCountry });
    }, 'Invalid phone number')
    .refine(value => {
      if (!value) return true;
      try {
        const phoneNumber = parsePhoneNumber(value, defaultCountry);
        const type = phoneNumber.getType();
        return type === 'MOBILE' || type === 'FIXED_LINE_OR_MOBILE';
      } catch (e) {
        return false;
      }
    }, 'Should be a mobile phone number');
}
