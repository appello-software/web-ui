import { eachMinuteOfInterval, endOfToday, format, startOfToday } from 'date-fns';
import React, { ForwardedRef, forwardRef, ReactElement, useMemo } from 'react';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import { ISO_TIME_FORMAT, TIME_FORMAT } from '~/components/common/TimePicker/consts';
import { Field, FieldProps } from '~/components/form/Field';
import { Select, SelectProps, SelectRefProps } from '~/components/form/Select';
import { useCombinedPropsWithKit } from '~/hooks';

type AllowedFieldProps = Pick<
  FieldProps,
  'label' | 'className' | 'required' | 'labelChildren' | 'labelClassName'
>;

type AllowedSelectProps<
  TValue,
  TIsMulti extends boolean,
  TIsClearable extends boolean,
  TIsCreatable extends boolean,
> = Pick<
  SelectProps<TValue, TIsMulti, TIsClearable, TIsCreatable>,
  | 'inputSize'
  | 'placeholder'
  | 'disabled'
  | 'components'
  | 'menuPortalTarget'
  | 'closeMenuOnScroll'
  | 'formatOptionLabel'
>;

export interface TimeFieldProps<TName, TFormValues extends FieldValues>
  extends AllowedFieldProps,
    AllowedSelectProps<TimeFieldValue, false, false, false> {
  labelFormat?: string;
  valueFormat?: string;
  name: TName;
  control: Control<TFormValues>;
  step?: number;
  defaultStartDate?: Date;
  defaultEndDate?: Date;
}

type TimeFieldValue = string | null;

const BaseTimeField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, TimeFieldValue>,
>(
  props: TimeFieldProps<TName, TFormValues>,
  ref: ForwardedRef<SelectRefProps<TimeFieldValue>>,
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
    labelChildren,
    labelClassName,
    formatOptionLabel,
    defaultStartDate = startOfToday(),
    defaultEndDate = endOfToday(),
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
    [defaultEndDate, defaultStartDate, labelFormat, step, valueFormat],
  );

  return (
    <Field
      {...{ className, label, required, labelChildren, labelClassName }}
      error={controller.fieldState.error}
    >
      <Select
        hasError={!!controller.fieldState.error}
        options={timeOptions}
        ref={ref}
        value={value}
        onChange={controller.field.onChange}
        {...{
          inputSize,
          placeholder,
          disabled,
          components,
          menuPortalTarget,
          closeMenuOnScroll,
          formatOptionLabel,
        }}
      />
    </Field>
  );
};

export const TimeField = forwardRef(BaseTimeField) as <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, TimeFieldValue>,
>(
  props: TimeFieldProps<TName, TFormValues> & {
    ref?: ForwardedRef<SelectRefProps<TimeFieldValue>>;
  },
) => ReactElement;
