import './styles.scss';

import { InputSize } from '@ui/components/form/TextInput';
import clsx from 'clsx';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import ReactSelect, { OnChangeValue } from 'react-select';
import { ActionMeta } from 'react-select/dist/declarations/src/types';

import { isMultiOption } from './utils';

export interface SelectOption<T> {
  label: string;
  value: T;
}

export type SelectValueType<
  TValue,
  TIsMulti extends boolean,
  TIsClearable extends boolean,
> = TIsMulti extends true ? TValue[] : TIsClearable extends true ? Nullable<TValue> : TValue;

export type SelectOnChange<TValue, TIsMulti extends boolean, TIsClearable extends boolean> = (
  value: SelectValueType<TValue, TIsMulti, TIsClearable>,
) => void;

export interface SelectProps<TValue, TIsMulti extends boolean, TIsClearable extends boolean> {
  value?: SelectValueType<TValue, TIsMulti, TIsClearable>;
  inputSize?: InputSize;
  options: SelectOption<TValue>[];
  isMulti?: TIsMulti;
  onChange?: SelectOnChange<TValue, TIsMulti, TIsClearable>;
  placeholder?: string;
  className?: string;
  isClearable?: TIsClearable;
  hasError?: boolean;
}

export const Select = <
  TValue,
  TIsMulti extends boolean = false,
  TIsClearable extends boolean = false,
>({
  placeholder,
  inputSize = InputSize.MEDIUM,
  value,
  options,
  className,
  isMulti = false as TIsMulti,
  onChange,
  isClearable = false as TIsClearable,
  hasError,
}: SelectProps<TValue, TIsMulti, TIsClearable>): React.ReactElement => {
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
      if (!onChange) return;

      if (action === 'clear' && !isMulti) {
        onChange(null as SelectValueType<TValue, TIsMulti, TIsClearable>);
        return;
      }

      if (isMultiOption(option)) {
        onChange(
          option.map(({ value }) => value) as SelectValueType<TValue, TIsMulti, TIsClearable>,
        );
      } else if (option) {
        onChange(option.value as SelectValueType<TValue, TIsMulti, TIsClearable>);
      }
    },
    [isMulti, onChange],
  );

  return (
    <ReactSelect
      className={clsx('react-select', className, {
        [`react-select--size-${inputSize}`]: inputSize,
        [`react-select--error`]: hasError,
      })}
      isMulti={isMulti}
      value={selectedOption}
      placeholder={placeholder}
      options={options}
      classNamePrefix="react-select"
      menuPortalTarget={document.body}
      onChange={handleChange}
      maxMenuHeight={300}
      menuPlacement="auto"
      menuPosition="fixed"
      unstyled
      isClearable={isClearable}
    />
  );
};
