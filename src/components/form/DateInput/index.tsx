import 'react-day-picker/dist/style.css';

import { useSwitchValue } from '@appello/common/lib/hooks';
import { useClickAway } from '@appello/web/lib/hooks';
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
import React, {
  FC,
  ReactElement,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CaptionLabelProps, DayPicker, Matcher, useDayPicker } from 'react-day-picker';

import { BrowserSelect } from '~/components/common/BrowserSelect';
import { Icon } from '~/components/common/Icon';
import { InputSize, TextInput } from '~/components/form/TextInput';
import { useAppelloKit } from '~/index';

import styles from './styles.module.scss';
import { formatWeekdayName } from './utils';

export interface DateInputProps<TValue extends Date | null> {
  placeholder?: string;
  inputSize?: InputSize;
  error?: boolean;
  value: TValue;
  onChange: (value: TValue) => void;
  className?: string;
  disabledDate?: Matcher;
}

export const DateInput = <TValue extends Date | null>({
  className,
  placeholder,
  inputSize,
  value,
  error,
  onChange,
  disabledDate,
}: DateInputProps<TValue>): ReactElement => {
  const { dateFormat } = useAppelloKit();
  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarWrapperRef = useRef<HTMLDivElement>(null);
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
      onChange(startOfDay(day) as TValue);
      closeCalendar();
    },
    [onChange, closeCalendar],
  );

  const renderWeekdayName = useCallback((date: Date) => {
    const name = formatWeekdayName(date);
    return <span className={clsx({ 'text-red': isWeekend(date) })}>{name}</span>;
  }, []);

  const displayDate = useMemo(() => {
    if (!value) {
      return '';
    }

    return format(value, dateFormat);
  }, [value, dateFormat]);

  useLayoutEffect(() => {
    const element = calendarWrapperRef.current;

    if (isCalendarVisible && element) {
      const rect = element.getBoundingClientRect();
      const isBottomOverflow = rect.bottom > window.innerHeight && rect.top > rect.height;
      if (isBottomOverflow) {
        element.classList.add(styles['calendar-wrapper--top']);
      }
    }
    return () => {
      if (isCalendarVisible) {
        element?.classList.remove(styles['calendar-wrapper--top']);
      }
    };
  }, [isCalendarVisible]);

  useClickAway(calendarRef, closeCalendar);

  return (
    <div ref={calendarRef} className={clsx('relative z-50', className)}>
      <div>
        <TextInput
          readOnly
          onClick={toggleCalendar}
          placeholder={placeholder}
          size={inputSize}
          value={displayDate}
          error={error}
          inputClassName="cursor-pointer"
          iconBeforeElement={<Icon name="calendar" />}
          iconAfterElement={
            <Icon name="down-arrow" className={clsx({ 'rotate-180': isCalendarVisible })} />
          }
        />
      </div>
      {isCalendarVisible && (
        <div className={styles['calendar-wrapper']} ref={calendarWrapperRef}>
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
            disabled={disabledDate}
          />
        </div>
      )}
    </div>
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
          <Icon name="down-arrow" className="ml-1 h-5 w-5" />
        </div>
      </BrowserSelect>
      <BrowserSelect
        options={yearsOptions}
        onChange={e => month && onMonthChange?.(setYear(month, Number(e.target.value)))}
        value={yearValue}
      >
        <div className="flex items-center">
          <p className="text-p3 font-semibold">{yearValue}</p>
          <Icon name="down-arrow" className="ml-1 h-5 w-5" />
        </div>
      </BrowserSelect>
    </>
  );
};
