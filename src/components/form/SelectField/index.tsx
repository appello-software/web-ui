import * as React from 'react';
import {
  Control,
  FieldPath,
  FieldPathByValue,
  FieldPathValue,
  FieldValues,
  useController,
} from 'react-hook-form';

import { Field, FieldProps } from '~/components/form/Field';
import { Select, SelectOnChange, SelectProps, SelectValueType } from '~/components/form/Select';

export interface SelectOption<T> {
  label: string;
  value: T;
}

type AllowedSelectProps<TValue, TIsMulti extends boolean, TIsClearable extends boolean> = Pick<
  SelectProps<TValue, TIsMulti, TIsClearable>,
  'inputSize' | 'isMulti' | 'placeholder' | 'isClearable' | 'disabled'
>;

interface Props<
  TFormValues extends FieldValues,
  TName extends FieldPath<TFormValues>,
  TValue,
  TIsMulti extends boolean,
  TIsClearable extends boolean,
> extends AllowedSelectProps<TValue, TIsMulti, TIsClearable>,
    Pick<FieldProps, 'label' | 'className' | 'required'> {
  name: TName;
  control: Control<TFormValues>;
  options: TIsMulti extends true
    ? SelectOption<FieldPathValue<TFormValues, TName>[number]>[]
    : SelectOption<FieldPathValue<TFormValues, TName>>[];
}

export const SelectField = <
  TFormValues extends FieldValues,
  TName extends TIsMulti extends true
    ? FieldPathByValue<TFormValues, unknown[]>
    : FieldPath<TFormValues>,
  TValue extends FieldPathValue<TFormValues, TName>,
  TIsMulti extends boolean = false,
  TIsClearable extends boolean = false,
>({
  control,
  name,
  options,
  label,
  className,
  required,
  isMulti,
  isClearable,
  inputSize,
  placeholder,
}: Props<TFormValues, TName, TValue, TIsMulti, TIsClearable>): React.ReactElement => {
  const controller = useController({ name, control });
  const value = controller.field.value as SelectValueType<TValue, TIsMulti, TIsClearable>;
  const onChange = controller.field.onChange as SelectOnChange<TValue, TIsMulti, TIsClearable>;

  return (
    <Field {...{ label, className, required }} error={controller.fieldState.error}>
      <Select
        {...{ isMulti, options, value, onChange, isClearable, inputSize, placeholder }}
        hasError={!!controller.fieldState.error}
      />
    </Field>
  );
};
