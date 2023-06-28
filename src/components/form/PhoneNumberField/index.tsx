import { CountryCode } from 'libphonenumber-js';
import React, { ReactElement } from 'react';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';
import { z } from 'zod';

import { Field, FieldProps, TextInput } from '~/components';
import { useCombinedPropsWithKit } from '~/hooks';

import { withPhoneNumberValidation } from './utils';

export interface PhoneNumberFieldProps<
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, string>,
> extends AllowedFieldProps {
  name: TName;
  control: Control<TFormValues>;
  placeholder?: string;
  defaultCountry?: CountryCode;
}

type AllowedFieldProps = Pick<FieldProps, 'label' | 'className' | 'required'>;

export const PhoneNumberField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, string>,
>(
  props: PhoneNumberFieldProps<TFormValues, TName>,
): ReactElement => {
  const {
    name,
    control,
    className,
    label,
    required,
    placeholder,
    defaultCountry = 'AU',
  } = useCombinedPropsWithKit({
    name: 'PhoneNumberField',
    props,
  });

  const controller = useController({
    name,
    control,
    rules: {
      validate: value => {
        const result = z
          .string()
          .and(withPhoneNumberValidation({ defaultCountry }))
          .safeParse(value);

        if (!result.success) {
          console.log(result.error);
          return result.error.formErrors.formErrors[0];
        }

        return true;
      },
      /* try {
          const phoneNumber = parsePhoneNumber(value, defaultCountry);
          return phoneNumber.number.toString();
        } catch (e) {
          return value;
        } */
    },
  });
  console.log(controller.field.value);

  return (
    <Field {...{ className, label, required }} error={controller.fieldState.error}>
      <TextInput
        {...controller.field}
        error={!!controller.fieldState.error}
        placeholder={placeholder ?? label}
      />
    </Field>
  );
};
