import 'react-day-picker/dist/style.css';

import { noop } from '@appello/common/lib/utils';
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
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActiveModifiers,
  CaptionLabelProps,
  DateRange,
  DayClickEventHandler,
  DayPicker,
  isDateRange,
  Matcher,
  SelectRangeEventHandler,
  useDayPicker,
} from 'react-day-picker';
import { createPortal } from 'react-dom';

import { BrowserSelect } from '~/components/common/BrowserSelect';
import { Icon } from '~/components/common/Icon';
import { useClickAway, useCombinedPropsWithKit } from '~/hooks';

import styles from './styles.module.scss';
import { formatWeekdayName } from './utils';

export interface DatePickerDefaultProps {
  mode?: undefined;
  value: Date | null;
  onChange: DayClickEventHandler;
}

export interface DatePickerRangeProps {
  mode: 'range';
  value: DateRange | null;
  onChange: (
    range: DateRange | null,
    selectedDay: Date,
    activeModifiers: ActiveModifiers,
    e: React.MouseEvent,
  ) => void;
}

export interface DatePickerBaseProps {
  disabledDate?: Matcher;
  callableElement: HTMLElement | null;
  onClose: () => void;
}

export type DatePickerPopupProps = DatePickerBaseProps &
  (DatePickerDefaultProps | DatePickerRangeProps);

export const DatePickerPopup: React.FC<DatePickerPopupProps> = props => {
  const { value, onChange, disabledDate, onClose, callableElement, mode } = useCombinedPropsWithKit(
    {
      name: 'DatePickerPopup',
      props,
    },
  );

  const [month, setMonth] = useState<Date>(
    () => (isDateRange(value) ? value.from : value) ?? new Date(),
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMonthChange = useCallback((month: Date) => {
    setMonth(month);
  }, []);

  const renderWeekdayName = useCallback((date: Date) => {
    const name = formatWeekdayName(date);
    return (
      <span className={clsx(styles['weekday'], { [styles['weekday--weekend']]: isWeekend(date) })}>
        {name}
      </span>
    );
  }, []);

  const handleDayClick: DayClickEventHandler = useCallback(
    (day, ...args) => {
      if (mode === undefined) {
        onChange(startOfDay(day), ...args);
        onClose();
      }
    },
    [mode, onChange, onClose],
  );

  const handleRangeSelect: SelectRangeEventHandler = useCallback(
    (range, ...args) => {
      if (mode === 'range') {
        onChange(range ?? null, ...args);
      }
    },
    [mode, onChange],
  );

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const isHTMLElement = entry.target instanceof HTMLElement;
        if (isHTMLElement && containerRef.current) {
          const rect = entry.target.getBoundingClientRect();
          containerRef.current.style.top = `${rect.bottom}px`;
          containerRef.current.style.left = `${rect.left}px`;
        }
      });
    });

    if (callableElement) {
      observer.observe(callableElement);
    }

    return () => {
      if (callableElement) {
        observer.unobserve(callableElement);
      }
    };
  }, [callableElement]);

  useEffect(() => {
    const calendarElement = containerRef.current;

    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const isHTMLElement = entry.target instanceof HTMLElement;
        if (isHTMLElement && callableElement) {
          const rect = entry.target.getBoundingClientRect();
          const callableRect = callableElement.getBoundingClientRect();
          const isBottomOverflow = rect.bottom > window.innerHeight && rect.top > rect.height;
          if (isBottomOverflow) {
            const position = callableRect.top - rect.height;
            const isTopOverflow = position < 0;
            if (!isTopOverflow) {
              entry.target.style.top = `${position}px`;
            }
          }
        }
      });
    });

    if (calendarElement) {
      observer.observe(calendarElement);
    }

    return () => {
      if (calendarElement) {
        observer.unobserve(calendarElement);
      }
    };
  }, [callableElement]);

  useEffect(() => {
    document.addEventListener('scroll', onClose, true);

    return () => {
      document.removeEventListener('scroll', onClose, true);
    };
  }, [onClose]);

  useClickAway(containerRef, onClose ?? noop, {
    excludeElements: callableElement ? [callableElement] : undefined,
  });

  const propsByMode =
    mode === 'range'
      ? {
          mode: 'range' as const,
          selected: value ?? undefined,
          onSelect: handleRangeSelect,
        }
      : {
          mode: 'default' as const,
          selected: value ?? undefined,
          onDayClick: handleDayClick,
        };

  return createPortal(
    <div className={styles['calendar-wrapper']} ref={containerRef}>
      <DayPicker
        {...propsByMode}
        month={month}
        className={styles['container']}
        onMonthChange={handleMonthChange}
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
    </div>,
    document.body,
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
        <div className={styles['control']}>
          <p className={styles['control__label']}>{monthLabel}</p>
          <Icon name="down-arrow" className={styles['control__arrow']} />
        </div>
      </BrowserSelect>
      <BrowserSelect
        options={yearsOptions}
        onChange={e => month && onMonthChange?.(setYear(month, Number(e.target.value)))}
        value={yearValue}
      >
        <div className={styles['control']}>
          <p className={styles['control__label']}>{yearValue}</p>
          <Icon name="down-arrow" className={styles['control__arrow']} />
        </div>
      </BrowserSelect>
    </>
  );
};
