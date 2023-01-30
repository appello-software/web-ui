import 'react-day-picker/dist/style.css';

import { useSwitchValue } from '@appello/common/lib/hooks';
import { useClickAway } from '@appello/web/lib/hooks';
import { BrowserSelect } from '@ui/components/common/BrowserSelect';
import { Icon } from '@ui/components/common/Icon';
import { Field } from '@ui/components/form/Field';
import { InputSize, TextInput } from '@ui/components/form/TextInput';
import clsx from 'clsx';
import {
  eachMonthOfInterval,
  endOfYear,
  format,
  isWeekend,
  setMonth,
  setYear,
  startOfDay,
  startOfYear,
} from 'date-fns';
import React, { FC, ReactElement, useCallback, useMemo, useRef, useState } from 'react';
import { CaptionLabelProps, DayPicker, useDayPicker } from 'react-day-picker';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import { DATE_FORMAT } from '~/constants/dates';

import styles from './styles.module.scss';
import { formatWeekdayName } from './utils';

interface Props<
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, Nullable<Date>>,
> {
  name: TName;
  control: Control<TFormValues>;

  // field props
  label?: string;
  className?: string;
  required?: boolean;

  // input props
  placeholder?: string;
  inputSize?: InputSize;
}

export const DateField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, Nullable<Date>>,
>({
  name,
  control,
  label,
  className,
  required,
  placeholder = label,
  inputSize,
}: Props<TFormValues, TName>): ReactElement => {
  const controller = useController({ name, control });
  const value = controller.field.value as Nullable<Date>;

  const calendarRef = useRef<HTMLDivElement>(null);
  const [month, setMonth] = useState(() => value ?? new Date());

  const {
    value: isCalendarVisible,
    toggle: toggleCalendar,
    off: closeCalendar,
  } = useSwitchValue(false);

  const handleMonthChange = useCallback((month: Date) => {
    setMonth(month);
  }, []);

  const handleDayChange = React.useCallback(
    (day: Date) => {
      controller.field.onChange(startOfDay(day));
      closeCalendar();
    },
    [controller.field, closeCalendar],
  );

  const renderWeekdayName = useCallback((date: Date) => {
    const name = formatWeekdayName(date);
    return <span className={clsx({ 'text-red': isWeekend(date) })}>{name}</span>;
  }, []);

  const displayDate = useMemo(() => {
    if (!value) {
      return '';
    }

    return format(value, DATE_FORMAT);
  }, [value]);

  useClickAway(calendarRef, closeCalendar);

  return (
    <Field
      label={label}
      className={className}
      childrenClassName="relative z-50"
      error={controller.fieldState.error}
      required={required}
    >
      <div ref={calendarRef}>
        <div>
          <TextInput
            readOnly
            onClick={toggleCalendar}
            placeholder={placeholder}
            size={inputSize}
            value={displayDate}
            error={!!controller.fieldState.error}
            inputClassName="cursor-pointer"
            iconBeforeElement={<Icon name="calendar" />}
            iconAfterElement={
              <Icon name="down-arrow" className={clsx({ 'rotate-180': isCalendarVisible })} />
            }
          />
        </div>
        {isCalendarVisible && (
          <div className="absolute mt-2">
            <DayPicker
              selected={value ?? undefined}
              month={month}
              className={styles['container']}
              onMonthChange={handleMonthChange}
              onDayClick={handleDayChange}
              components={{ CaptionLabel }}
              modifiers={{
                weekend: isWeekend,
              }}
              modifiersClassNames={{
                weekend: 'rdp-day--weekend',
                today: 'rdp-day--today',
              }}
              formatters={{
                formatWeekdayName: renderWeekdayName,
              }}
            />
          </div>
        )}
      </div>
    </Field>
  );
};

const yearsOptions = Array.from({ length: 100 }, (_, index) => {
  const year = new Date().getFullYear() + 5 - index;
  return { label: year.toString(), value: year.toString() };
});

const monthsOptions = eachMonthOfInterval({
  start: startOfYear(new Date()),
  end: endOfYear(new Date()),
}).map(month => {
  return { label: format(month, 'MMMM'), value: `${month.getMonth()}` };
});

const CaptionLabel: FC<CaptionLabelProps> = ({ displayMonth }) => {
  const { onMonthChange, month } = useDayPicker();

  const monthLabel = useMemo(() => format(displayMonth, 'MMMM'), [displayMonth]);
  const monthValue = useMemo(() => `${displayMonth.getMonth()}`, [displayMonth]);
  const yearValue = useMemo(() => format(displayMonth, 'yyyy'), [displayMonth]);

  return (
    <>
      <BrowserSelect
        options={monthsOptions}
        onChange={e => month && onMonthChange?.(setMonth(month, Number(e.target.value)))}
        value={monthValue}
      >
        <div className="flex items-center">
          <p className="text-p3 font-semibold">{monthLabel}</p>
          <Icon name="down-arrow" className="w-5 h-5 ml-1" />
        </div>
      </BrowserSelect>
      <BrowserSelect
        options={yearsOptions}
        onChange={e => month && onMonthChange?.(setYear(month, Number(e.target.value)))}
        value={yearValue}
      >
        <div className="flex items-center">
          <p className="text-p3 font-semibold">{yearValue}</p>
          <Icon name="down-arrow" className="w-5 h-5 ml-1" />
        </div>
      </BrowserSelect>
    </>
  );
};
