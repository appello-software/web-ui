import React, { ReactElement } from 'react';
import { ActiveModifiers, DateRange } from 'react-day-picker';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import { DateInput, DateInputProps } from '~/components/form/DateInput';
import { Field, FieldProps } from '~/components/form/Field';
import { useCombinedPropsWithKit } from '~/hooks';

type AllowedDateInputProps = Pick<
  DateInputProps,
  'placeholder' | 'inputSize' | 'disabledDate' | 'iconAfterName' | 'yearsLength' | 'mode'
>;
type AllowedFieldProps = Pick<
  FieldProps,
  'label' | 'className' | 'required' | 'labelChildren' | 'labelClassName'
>;

export interface DateProps<
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, Date | DateRange | null>,
> extends AllowedDateInputProps,
    AllowedFieldProps {
  name: TName;
  control: Control<TFormValues>;
}

export const DateField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, Date | DateRange | null>,
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
  } = useCombinedPropsWithKit({
    name: 'DateField',
    props,
  });

  const controller = useController({ name, control });

  const propsByMode =
    mode === 'range'
      ? {
          mode: 'range' as const,
          value: controller.field.value as DateRange | null,
          onChange: controller.field.onChange as (
            range: DateRange | null,
            selectedDay: Date,
            activeModifiers: ActiveModifiers,
            e: React.MouseEvent,
          ) => void,
          yearsLength,
        }
      : {
          mode: undefined,
          value: controller.field.value as Date | null,
          onChange: controller.field.onChange as (value: Date | null) => void,
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
        disabledDate={disabledDate}
        error={!!controller.fieldState.error}
        iconAfterName={iconAfterName}
        inputSize={inputSize}
        placeholder={placeholder ?? label}
        {...propsByMode}
      />
    </Field>
  );
};
