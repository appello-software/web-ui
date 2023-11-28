import * as React from 'react';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import { Field, FieldProps } from '~/components/form/Field';
import { TextInput, TextInputProps } from '~/components/form/TextInput';
import { useCombinedPropsWithKit } from '~/hooks';

type AllowedInputProps = Omit<TextInputProps, 'label' | 'className' | 'required'>;
type AllowedFieldProps = Pick<FieldProps, 'label' | 'className' | 'required'>;

export interface TextFieldProps<
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, number | string>,
> extends AllowedInputProps,
    AllowedFieldProps {
  name: TName;
  control: Control<TFormValues>;

  // input type
  type?: 'text' | 'email' | 'search' | 'tel' | 'url' | 'number';
}

export const TextField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, number | string>,
>(
  props: TextFieldProps<TFormValues, TName>,
): React.ReactElement => {
  const { name, control, label, className, required, placeholder, ...textInputProps } =
    useCombinedPropsWithKit({
      name: 'TextField',
      props,
    });

  const controller = useController({ name, control });

  return (
    <Field {...{ className, label, required }} error={controller.fieldState.error}>
      <TextInput
        {...controller.field}
        error={!!controller.fieldState.error}
        placeholder={placeholder ?? label}
        {...textInputProps}
      />
    </Field>
  );
};
