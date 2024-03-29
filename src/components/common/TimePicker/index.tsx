import './styles.scss';

import clsx from 'clsx';
import { eachMinuteOfInterval, endOfToday, format, startOfToday } from 'date-fns';
import React, { useMemo } from 'react';

import { BrowserSelect } from '~/components/common/BrowserSelect';
import { ISO_TIME_FORMAT, TIME_FORMAT } from '~/components/common/TimePicker/consts';
import { useCombinedPropsWithKit } from '~/hooks';

export interface TimePickerProps {
  labelFormat?: string;
  valueFormat?: string;
  className?: string;
  onChange: (p: string) => void;
  value: string;
}

const step = 30;

const defaultStartDate = startOfToday();
const defaultEndDate = endOfToday();

export const TimePicker: React.FC<TimePickerProps> = props => {
  const {
    value,
    valueFormat = ISO_TIME_FORMAT,
    labelFormat = TIME_FORMAT,
    className,
    onChange,
  } = useCombinedPropsWithKit({
    name: 'TimePicker',
    props,
  });

  const options = useMemo(
    () =>
      eachMinuteOfInterval(
        { start: defaultStartDate, end: defaultEndDate },
        {
          step,
        },
      ).map(time => ({ value: format(time, valueFormat), label: format(time, labelFormat) })),
    [valueFormat, labelFormat],
  );

  const selectedValue = useMemo(() => options.find(item => item.value === value), [value, options]);

  return (
    <BrowserSelect
      className="time-picker"
      options={options}
      value={value}
      onChange={event => onChange(event.target.value)}
    >
      <button className={clsx('time-picker__control', className)} type="button">
        {selectedValue?.label || 'select time'}
      </button>
    </BrowserSelect>
  );
};
