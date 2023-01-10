import './styles.scss';

import { Field } from '@ui/components/form/Field';
import { isMultiOption } from '@ui/components/form/SelectField/utils';
import { InputSize } from '@ui/components/form/TextInput';
import clsx from 'clsx';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { Control, FieldPath, FieldPathValue, FieldValues, useController } from 'react-hook-form';
import Select, { OnChangeValue, StylesConfig } from 'react-select';
import { ActionMeta } from 'react-select/dist/declarations/src/types';

export interface SelectOption<T> {
  label: string;
  value: T;
}

interface Props<TFormValues extends FieldValues, TValue, TIsMulti> {
  name: FieldPath<TFormValues>;
  options: SelectOption<TValue>[];
  control: Control<TFormValues>;
  isMulti?: TIsMulti;
  // input props
  placeholder?: string;
  inputSize?: InputSize;
  // field props
  label?: string;
  className?: string;
}

const styleProxy = new Proxy(
  {},
  {
    get: (_, name) => (style: StylesConfig) => {
      if (name === 'menuPortal') {
        return style;
      }
      return undefined;
    },
  },
);

export const SelectField = <
  TFormValues extends FieldValues,
  TValue extends FieldPathValue<TFormValues, FieldPath<TFormValues>>,
  TIsMulti extends boolean,
>({
  control,
  name,
  options,
  label,
  placeholder = label,
  className,
  isMulti,
  inputSize = InputSize.MEDIUM,
}: Props<TFormValues, TValue, TIsMulti>): React.ReactElement => {
  const controller = useController({ name, control });
  const value = controller.field.value as TValue;

  const selectedOption = useMemo(() => {
    if (isMulti && Array.isArray(value)) {
      return options.filter(option => value.includes(option.value));
    }
    return options.find(option => option.value === value) || null;
  }, [isMulti, options, value]);

  const handleChange = useCallback(
    (
      option: OnChangeValue<SelectOption<TValue>, TIsMulti>,
      { action }: ActionMeta<SelectOption<TValue>>,
    ) => {
      if (action === 'clear') controller.field.onChange(null);
      if (isMultiOption(option)) {
        controller.field.onChange(option.map(({ value }) => value));
      } else if (option) {
        controller.field.onChange(option.value);
      }
    },
    [controller.field],
  );

  return (
    <Field label={label} error={controller.fieldState.error} className={className}>
      <Select
        className={clsx('react-select', { [`react-select--size-${inputSize}`]: inputSize })}
        isMulti={isMulti}
        options={options}
        onChange={handleChange}
        value={selectedOption}
        placeholder={placeholder}
        styles={styleProxy}
        classNamePrefix="react-select"
        menuPortalTarget={document.body}
        menuPosition="fixed"
        isClearable={!isMulti}
      />
    </Field>
  );
};
