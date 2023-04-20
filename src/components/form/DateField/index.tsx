import React, { ReactElement } from 'react';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import { DateInput, DateInputProps } from '~/components/form/DateInput';
import { Field, FieldProps } from '~/components/form/Field';

type AllowedDateInputProps = Pick<
  DateInputProps<null>,
  'placeholder' | 'inputSize' | 'disabledDate'
>;
type AllowedFieldProps = Pick<FieldProps, 'label' | 'className' | 'required'>;

export interface DateProps<
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, Date | null>,
> extends AllowedDateInputProps,
    AllowedFieldProps {
  name: TName;
  control: Control<TFormValues>;
}

export const DateField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, Date | null>,
>({
  name,
  control,
  label,
  className,
  required,
  placeholder = label,
  inputSize,
  disabledDate,
}: DateProps<TFormValues, TName>): ReactElement => {
  const controller = useController({ name, control });
  const value = controller.field.value as Date | null;
  const onChange = controller.field.onChange as (value: Date | null) => void;

  return (
    <Field
      label={label}
      className={className}
      error={controller.fieldState.error}
      required={required}
    >
      <DateInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputSize={inputSize}
        error={!!controller.fieldState.error}
        disabledDate={disabledDate}
      />
    </Field>
  );
};
