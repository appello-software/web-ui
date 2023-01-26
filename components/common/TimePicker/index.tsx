import { BrowserSelect } from '@ui/components/common/BrowserSelect';
import { ISO_TIME_FORMAT, TIME_FORMAT } from '@ui/components/common/TimePicker/consts';
import clsx from 'clsx';
import { eachMinuteOfInterval, endOfToday, format, startOfToday } from 'date-fns';
import React, { useMemo } from 'react';

interface TimePickerProps {
  labelFormat?: string;
  valueFormat?: string;
  className?: string;
  onChange: (p: string) => void;
  value: string;
}

const step = 30;

const defaultStartDate = startOfToday();
const defaultEndDate = endOfToday();

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  valueFormat = ISO_TIME_FORMAT,
  labelFormat = TIME_FORMAT,
  className,
  onChange,
}) => {
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
    <BrowserSelect options={options} value={value} onChange={event => onChange(event.target.value)}>
      <button type="button" className={clsx('relative', className)}>
        {selectedValue?.label || 'select time'}
      </button>
    </BrowserSelect>
  );
};
