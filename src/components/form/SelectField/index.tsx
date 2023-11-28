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
import {
  Select,
  SelectOnChange,
  SelectOptionType,
  SelectProps,
  SelectValueType,
} from '~/components/form/Select';
import { useCombinedPropsWithKit } from '~/hooks';

type AllowedSelectProps<
  TValue,
  TIsMulti extends boolean,
  TIsClearable extends boolean,
  TIsCreatable extends boolean,
> = Pick<
  SelectProps<TValue, TIsMulti, TIsClearable, TIsCreatable>,
  | 'inputSize'
  | 'isMulti'
  | 'placeholder'
  | 'isClearable'
  | 'isCreatable'
  | 'disabled'
  | 'components'
  | 'hideSelectedOptions'
  | 'isSearchable'
  | 'multiValueContent'
  | 'variantMulti'
>;

export interface SelectFieldProps<
  TFormValues extends FieldValues,
  TName extends FieldPath<TFormValues>,
  TValue,
  TIsMulti extends boolean,
  TIsClearable extends boolean,
  TIsCreatable extends boolean,
> extends AllowedSelectProps<TValue, TIsMulti, TIsClearable, TIsCreatable>,
    Pick<FieldProps, 'label' | 'className' | 'required'> {
  name: TName;
  control: Control<TFormValues>;
  options: SelectOptionType<FieldPathValue<TFormValues, TName>>[];
}

export const SelectField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<
    TFormValues,
    SelectValueType<TValue, TIsMulti, TIsClearable, TIsCreatable>
  >,
  TValue extends FieldPathValue<TFormValues, TName>,
  TIsMulti extends boolean = false,
  TIsClearable extends boolean = false,
  TIsCreatable extends boolean = false,
>(
  props: SelectFieldProps<TFormValues, TName, TValue, TIsMulti, TIsClearable, TIsCreatable>,
): React.ReactElement => {
  const {
    control,
    name,
    options,
    label,
    className,
    required,
    isMulti,
    isClearable,
    isCreatable,
    inputSize,
    placeholder,
    disabled,
    components,
    isSearchable,
    variantMulti,
    multiValueContent,
    hideSelectedOptions,
  } = useCombinedPropsWithKit({
    name: 'SelectField',
    props,
  });

  const controller = useController({ name, control });
  const value = controller.field.value as SelectProps<
    TValue,
    TIsMulti,
    TIsClearable,
    TIsCreatable
  >['value'];
  const onChange = controller.field.onChange as SelectOnChange<
    TValue,
    TIsMulti,
    TIsClearable,
    TIsCreatable
  >;

  return (
    <Field {...{ label, className, required }} error={controller.fieldState.error}>
      <Select
        {...{
          isMulti,
          options,
          value,
          onChange,
          isClearable,
          isCreatable,
          inputSize,
          placeholder,
          disabled,
          components,
          isSearchable,
          variantMulti,
          multiValueContent,
          hideSelectedOptions,
        }}
        hasError={!!controller.fieldState.error}
      />
    </Field>
  );
};
