import { Nullable } from '@appello/common';
import React, { ReactElement } from 'react';
import { ActiveModifiers, DateRange } from 'react-day-picker';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import { DateInput, DateInputProps } from '~/components/form/DateInput';
import { Field, FieldProps } from '~/components/form/Field';
import { useCombinedPropsWithKit } from '~/hooks';

type AllowedDateInputProps = Pick<
  DateInputProps,
  | 'placeholder'
  | 'inputSize'
  | 'disabledDate'
  | 'iconAfterName'
  | 'iconAfterElementClassName'
  | 'inputClassName'
  | 'rightElement'
  | 'yearsLength'
  | 'mode'
  | 'disabled'
  | 'selectedDate'
>;
type AllowedFieldProps = Pick<
  FieldProps,
  'label' | 'className' | 'required' | 'labelChildren' | 'labelClassName'
>;

export interface DateProps<
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, Nullable<Date | DateRange>>,
> extends AllowedDateInputProps,
    AllowedFieldProps {
  name: TName;
  control: Control<TFormValues>;
}

export const DateField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, Nullable<Date | DateRange>>,
>(
  props: DateProps<TFormValues, TName>,
): ReactElement => {
  const {
    name,
    control,
    label,
    className,
    required,
    placeholder,
    inputSize,
    disabledDate,
    iconAfterName,
    labelChildren,
    labelClassName,
    yearsLength,
    mode,
    disabled,
    rightElement,
    iconAfterElementClassName,
    inputClassName,
    selectedDate,
  } = useCombinedPropsWithKit({
    name: 'DateField',
    props,
  });

  const controller = useController({ name, control });

  const propsByMode =
    mode === 'range'
      ? {
          mode: 'range' as const,
          value: controller.field.value as Nullable<DateRange>,
          onChange: controller.field.onChange as (
            range: Nullable<DateRange>,
            selectedDay: Date,
            activeModifiers: ActiveModifiers,
            e: React.MouseEvent,
          ) => void,
          yearsLength,
        }
      : {
          mode: undefined,
          value: controller.field.value as Nullable<Date>,
          onChange: controller.field.onChange as (value: Nullable<Date>) => void,
          yearsLength,
        };

  return (
    <Field
      {...{
        className,
        error: controller.fieldState.error,
        label,
        labelChildren,
        required,
        labelClassName,
      }}
    >
      <DateInput
        disabled={disabled}
        disabledDate={disabledDate}
        error={!!controller.fieldState.error}
        iconAfterElementClassName={iconAfterElementClassName}
        iconAfterName={iconAfterName}
        inputClassName={inputClassName}
        inputSize={inputSize}
        placeholder={placeholder ?? label}
        rightElement={rightElement}
        selectedDate={selectedDate}
        {...propsByMode}
      />
    </Field>
  );
};
