import { eachMinuteOfInterval, endOfToday, format, startOfToday } from 'date-fns';
import React, { ReactElement, useMemo } from 'react';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import { ISO_TIME_FORMAT, TIME_FORMAT } from '~/components/common/TimePicker/consts';
import { Field, FieldProps } from '~/components/form/Field';
import { Select, SelectProps } from '~/components/form/Select';
import { useCombinedPropsWithKit } from '~/hooks';

type AllowedFieldProps = Pick<FieldProps, 'label' | 'className' | 'required' | 'labelChildren'>;

type AllowedSelectProps<
  TValue,
  TIsMulti extends boolean,
  TIsClearable extends boolean,
  TIsCreatable extends boolean,
> = Pick<
  SelectProps<TValue, TIsMulti, TIsClearable, TIsCreatable>,
  'inputSize' | 'placeholder' | 'disabled' | 'components' | 'menuPortalTarget' | 'closeMenuOnScroll'
>;

export interface TimeFieldProps<TName, TFormValues extends FieldValues>
  extends AllowedFieldProps,
    AllowedSelectProps<TimeFieldValue, false, false, false> {
  labelFormat?: string;
  valueFormat?: string;
  name: TName;
  control: Control<TFormValues>;
  step?: number;
}
const defaultStartDate = startOfToday();
const defaultEndDate = endOfToday();

type TimeFieldValue = string | null;

export const TimeField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, TimeFieldValue>,
>(
  props: TimeFieldProps<TName, TFormValues>,
): ReactElement => {
  const {
    name,
    control,
    valueFormat = ISO_TIME_FORMAT,
    labelFormat = TIME_FORMAT,
    step = 30,
    label,
    className,
    required,
    inputSize,
    placeholder,
    disabled,
    components,
    menuPortalTarget,
    closeMenuOnScroll,
  } = useCombinedPropsWithKit({
    name: 'TimeField',
    props,
  });

  const controller = useController({ name, control });
  const value = controller.field.value as TimeFieldValue;

  const timeOptions = useMemo(
    () =>
      eachMinuteOfInterval(
        { start: defaultStartDate, end: defaultEndDate },
        {
          step,
        },
      ).map(time => ({
        value: format(time, valueFormat),
        label: format(time, labelFormat),
      })),
    [labelFormat, step, valueFormat],
  );

  return (
    <Field {...{ className, label, required }} error={controller.fieldState.error}>
      <Select
        hasError={!!controller.fieldState.error}
        options={timeOptions}
        value={value}
        onChange={controller.field.onChange}
        {...{ inputSize, placeholder, disabled, components, menuPortalTarget, closeMenuOnScroll }}
      />
    </Field>
  );
};
