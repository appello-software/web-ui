import * as React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { FieldPath } from 'react-hook-form/dist/types';

import { Field, FieldProps } from '~/components/form/Field';
import { TextInput, TextInputProps } from '~/components/form/TextInput';
import { useCombinedPropsWithKit } from '~/hooks';

type AllowedInputProps = Omit<TextInputProps, 'label' | 'className' | 'required'>;
type AllowedFieldProps = Pick<
  FieldProps,
  'label' | 'className' | 'required' | 'labelChildren' | 'labelClassName'
>;

export interface TextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends AllowedInputProps,
    AllowedFieldProps {
  name: TName;
  control: Control<TFieldValues>;

  // input type
  type?: 'text' | 'email' | 'search' | 'tel' | 'url' | 'number';
}

export const TextField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: TextFieldProps<TFieldValues, TName>,
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
      defaultValue={'' as any}
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
