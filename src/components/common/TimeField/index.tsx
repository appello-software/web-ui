import { eachMinuteOfInterval, endOfToday, format, startOfToday } from 'date-fns';
import React, { ReactElement, useMemo } from 'react';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import { Select } from '~/components/form';
import { useCombinedPropsWithKit } from '~/hooks';

import { ISO_TIME_FORMAT, TIME_FORMAT } from '../TimePicker/consts';

export interface TimeFieldProps<TName, TFormValues extends FieldValues> {
  labelFormat?: string;
  valueFormat?: string;
  name: TName;
  control: Control<TFormValues>;
}

const step = 30;

const defaultStartDate = startOfToday();
const defaultEndDate = endOfToday();

export const TimeField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, string>,
>(
  props: TimeFieldProps<TName, TFormValues>,
): ReactElement => {
  const {
    name,
    control,
    valueFormat = ISO_TIME_FORMAT,
    labelFormat = TIME_FORMAT,
  } = useCombinedPropsWithKit({
    name: 'TimeField',
    props,
  });
  const controller = useController({ name, control });
  const value = controller.field.value as string;

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
    [labelFormat, valueFormat],
  );

  return <Select value={value} onChange={controller.field.onChange} options={timeOptions} />;
};
