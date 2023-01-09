import { Field, FieldProps } from '@ui/components/form/Field';
import { TextInput, TextInputProps } from '@ui/components/form/TextInput';
import * as React from 'react';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

type AllowedInputProps = Pick<
  TextInputProps,
  'autoComplete' | 'autoFocus' | 'size' | 'placeholder' | 'maxLength'
>;
type AllowedFieldProps = Pick<FieldProps, 'label' | 'className' | 'required'>;

interface Props<
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
>({
  name,
  control,
  label,
  className,
  required,
  placeholder = label,
  ...textInputProps
}: Props<TFormValues, TName>): React.ReactElement => {
  const controller = useController({ name, control });

  return (
    <Field {...{ className, label, required }} error={controller.fieldState.error}>
      <TextInput
        {...controller.field}
        error={!!controller.fieldState.error}
        placeholder={placeholder}
        {...textInputProps}
      />
    </Field>
  );
};
