import * as React from 'react';
import { Control, Controller, FieldPathByValue, FieldValues } from 'react-hook-form';

import { Field, FieldProps } from '~/components/form/Field';
import { TextInput, TextInputProps } from '~/components/form/TextInput';
import { useCombinedPropsWithKit } from '~/hooks';

type AllowedInputProps = Omit<TextInputProps, 'label' | 'className' | 'required'>;
type AllowedFieldProps = Pick<
  FieldProps,
  'label' | 'className' | 'required' | 'labelChildren' | 'labelClassName'
>;

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
  const {
    name,
    control,
    label,
    className,
    required,
    placeholder,
    labelChildren,
    labelClassName,
    ...textInputProps
  } = useCombinedPropsWithKit({
    name: 'TextField',
    props,
  });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Field {...{ className, label, required, labelChildren, labelClassName }} error={error}>
          <TextInput
            error={!!error}
            placeholder={placeholder ?? label}
            {...field}
            {...textInputProps}
          />
        </Field>
      )}
    />
  );
};
