import { DateInput, DateInputProps } from '@ui/components/form/DateInput';
import { Field, FieldProps } from '@ui/components/form/Field';
import React, { ReactElement } from 'react';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

type AllowedDateInputProps = Pick<
  DateInputProps<null>,
  'placeholder' | 'inputSize' | 'disabledDate'
>;
type AllowedFieldProps = Pick<FieldProps, 'label' | 'className' | 'required'>;

interface Props<
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, Nullable<Date>>,
> extends AllowedDateInputProps,
    AllowedFieldProps {
  name: TName;
  control: Control<TFormValues>;
}

export const DateField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, Nullable<Date>>,
>({
  name,
  control,
  label,
  className,
  required,
  placeholder = label,
  inputSize,
  disabledDate,
}: Props<TFormValues, TName>): ReactElement => {
  const controller = useController({ name, control });
  const value = controller.field.value as Nullable<Date>;
  const onChange = controller.field.onChange as (value: Nullable<Date>) => void;

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
