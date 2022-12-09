import { Field } from '@ui/components/form/Field';
import { InputSize, TextInput } from '@ui/components/form/TextInput';
import * as React from 'react';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

interface Props<
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, string>,
> {
  name: TName;
  control: Control<TFormValues>;

  // field props
  label?: string;
  className?: string;
  required?: boolean;

  // input props
  autoComplete?: boolean | string;
  autoFocus?: boolean;
  size?: InputSize;
  placeholder?: string;
}

export const TextField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, string>,
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
