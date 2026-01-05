import 'react-day-picker/dist/style.css';

import { noop, Nullable } from '@appello/common';
import { useClickAway } from '@appello/web-kit';
import {
  eachMonthOfInterval,
  endOfYear,
  format,
  setMonth,
  setYear,
  startOfDay,
  startOfMonth,
  startOfYear,
} from 'date-fns';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  CaptionLabelProps as ReactDayCaptionLabelProps,
  DateRange,
  type DayEventHandler,
  DayPicker,
  isDateRange,
  Matcher,
  type PropsRange,
  useDayPicker,
} from 'react-day-picker';
import { createPortal } from 'react-dom';

import { BrowserSelect } from '~/components/common/BrowserSelect';
import { Icon } from '~/components/common/Icon';
import { useCombinedPropsWithKit } from '~/hooks';

import styles from './styles.module.scss';
import { formatWeekdayName } from './utils';

export interface DatePickerDefaultProps {
  mode?: undefined;
  value: Date | null;
  onChange: DayEventHandler<React.MouseEvent>;
}

export interface DatePickerRangeProps {
  mode: 'range';
  value: Nullable<DateRange>;
  onChange: (range: Nullable<DateRange>) => void;
}

export interface DatePickerBaseProps {
  yearsLength?: number;
  disabledDate?: Matcher;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  callableElement: HTMLElement | null;
  onClose: () => void;
}

export type DatePickerPopupProps = DatePickerBaseProps &
  (DatePickerDefaultProps | DatePickerRangeProps);

export const DatePickerPopup: React.FC<DatePickerPopupProps> = props => {
  const {
    value,
    onChange,
    disabledDate,
    onClose,
    callableElement,
    mode,
    yearsLength = 100,
    position = 'bottom-left',
  } = useCombinedPropsWithKit({
    name: 'DatePickerPopup',
    props,
  });
  const [month, setMonth] = useState<Date>(
    () => (isDateRange(value) ? value.from : value) ?? new Date(),
  );

  const handleMonthChange = useCallback((month: Date) => {
    setMonth(month);
  }, []);

  const handleDayClick: DayEventHandler<React.MouseEvent> = useCallback(
    (day, ...args) => {
      if (mode === undefined) {
        onChange(startOfDay(day), ...args);
        onClose();
      }
    },
    [mode, onChange, onClose],
  );

  const handleRangeSelect: PropsRange['onSelect'] = useCallback(
    range => {
      if (mode === 'range') {
        onChange(range ?? null);
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
          const callableRect = callableElement?.getBoundingClientRect();
          if (position?.includes('top')) {
            containerRef.current.style.top = `${122}px`;
          }

          if (position?.includes('bottom')) {
            containerRef.current.style.top = `${rect.bottom}px`;
          }

          if (position?.includes('left')) {
            containerRef.current.style.left = `${rect.left}px`;
          } else {
            containerRef.current.style.right = `${rect.right - Number(callableRect?.width)}px`;
          }
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
  }, [callableElement, position]);

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

  const { ref: containerRef } = useClickAway<HTMLDivElement>(onClose ?? noop, {
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
          mode: 'single' as const,
          selected: value ?? undefined,
          onDayClick: handleDayClick,
        };

  return createPortal(
    <div className={styles['calendar-wrapper']} ref={containerRef}>
      <DayPicker
        {...propsByMode}
        className={styles['container']}
        components={{
          CaptionLabel: props => <CaptionLabel {...props} yearsLength={yearsLength} />,
        }}
        disabled={disabledDate}
        formatters={{
          formatWeekdayName: date => formatWeekdayName(date),
        }}
        modifiers={{
          weekend: {
            dayOfWeek: [0, 6],
          },
        }}
        modifiersClassNames={{
          weekend: 'rdp-weekend',
          today: 'rdp-day--today',
        }}
        month={month}
        onMonthChange={handleMonthChange}
      />
    </div>,
    document.body,
  );
};

interface CaptionLabelProps extends ReactDayCaptionLabelProps {
  yearsLength?: number;
}

const CaptionLabel: FC<CaptionLabelProps> = ({ yearsLength = 100 }) => {
  const {
    dayPickerProps: { onMonthChange, month },
  } = useDayPicker();

  const currentMonth = useMemo(() => month ?? new Date(), [month]);
  const base = startOfMonth(currentMonth);
  const monthLabel = useMemo(() => format(currentMonth, 'MMMM'), [currentMonth]);
  const monthValue = useMemo(() => String(currentMonth.getMonth()), [currentMonth]); // "0".."11"

  const yearValue = useMemo(() => String(currentMonth.getFullYear()), [currentMonth]);

  const yearsOptions = Array.from({ length: yearsLength }, (_, index) => {
    const year = new Date().getFullYear() + 5 - index;
    return { label: year.toString(), value: year.toString() };
  });
  const monthsOptions = eachMonthOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date()),
  }).map(month => {
    return { label: format(month, 'MMMM'), value: `${month.getMonth()}` };
  });

  return (
    <>
      <BrowserSelect
        options={monthsOptions}
        value={monthValue}
        onChange={e => onMonthChange?.(setMonth(base, Number(e.target.value)))}
      >
        <div className={styles['control']}>
          <p className={styles['control__label']}>{monthLabel}</p>
          <Icon className={styles['control__arrow']} name="down-arrow" />
        </div>
      </BrowserSelect>
      <BrowserSelect
        options={yearsOptions}
        value={yearValue}
        onChange={e => onMonthChange?.(setYear(base, Number(e.target.value)))}
      >
        <div className={styles['control']}>
          <p className={styles['control__label']}>{yearValue}</p>
          <Icon className={styles['control__arrow']} name="down-arrow" />
        </div>
      </BrowserSelect>
    </>
  );
};
