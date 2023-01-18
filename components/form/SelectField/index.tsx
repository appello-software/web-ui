import { Field } from '@ui/components/form/Field';
import { Select, SelectOnChange, SelectValueType } from '@ui/components/form/Select';
import { SelectProps } from '@ui/components/form/Select';
import * as React from 'react';
import {
  Control,
  FieldPath,
  FieldPathByValue,
  FieldPathValue,
  FieldValues,
  useController,
} from 'react-hook-form';

export interface SelectOption<T> {
  label: string;
  value: T;
}

type AllowedSelectProps<TValue, TIsMulti extends boolean, TIsClearable extends boolean> = Pick<
  SelectProps<TValue, TIsMulti, TIsClearable>,
  'inputSize' | 'isMulti' | 'placeholder' | 'isClearable'
>;

interface Props<
  TFormValues extends FieldValues,
  TName extends FieldPath<TFormValues>,
  TValue,
  TIsMulti extends boolean,
  TIsClearable extends boolean,
> extends AllowedSelectProps<TValue, TIsMulti, TIsClearable> {
  name: TName;
  control: Control<TFormValues>;
  className?: string;
  options: TIsMulti extends true
    ? SelectOption<FieldPathValue<TFormValues, TName>[number]>[]
    : SelectOption<FieldPathValue<TFormValues, TName>>[];
  label?: string;
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
  isMulti,
  isClearable,
  inputSize,
  placeholder,
}: Props<TFormValues, TName, TValue, TIsMulti, TIsClearable>): React.ReactElement => {
  const controller = useController({ name, control });
  const value = controller.field.value as SelectValueType<TValue, TIsMulti, TIsClearable>;
  const onChange = controller.field.onChange as SelectOnChange<TValue, TIsMulti, TIsClearable>;

  return (
    <Field label={label} error={controller.fieldState.error} className={className}>
      <Select {...{ isMulti, options, value, onChange, isClearable, inputSize, placeholder }} />
    </Field>
  );
};
