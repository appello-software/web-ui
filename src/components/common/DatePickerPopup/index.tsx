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
  CaptionLabelProps,
  DayClickEventHandler,
  DayPicker,
  Matcher,
  useDayPicker,
} from 'react-day-picker';
import { createPortal } from 'react-dom';

import { BrowserSelect } from '~/components/common/BrowserSelect';
import { Icon } from '~/components/common/Icon';
import { useClickAway } from '~/hooks';

import styles from './styles.module.scss';
import { formatWeekdayName } from './utils';

export interface DatePickerPopupProps {
  value: Date | null;
  onChange: DayClickEventHandler;
  disabledDate?: Matcher;
  callableElement: HTMLElement | null;
  onClose: () => void;
}

export const DatePickerPopup: React.FC<DatePickerPopupProps> = ({
  value,
  onChange,
  disabledDate,
  onClose,
  callableElement,
}) => {
  const [month, setMonth] = useState(() => value ?? new Date());
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

  useEffect(() => {
    const inputElement = callableElement;

    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const isHTMLElement = entry.target instanceof HTMLElement;
        if (isHTMLElement && containerRef.current) {
          const rect = entry.target.getBoundingClientRect();
          containerRef.current.style.top = `${rect.bottom}px`;
        }
      });
    });

    if (inputElement) {
      observer.observe(inputElement);
    }

    return () => {
      if (inputElement) {
        observer.unobserve(inputElement);
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

  return createPortal(
    <div style={{ position: 'fixed' }} ref={containerRef}>
      <DayPicker
        selected={value ?? undefined}
        month={month}
        className={styles['container']}
        onMonthChange={handleMonthChange}
        onDayClick={(day, ...args) => {
          onChange(startOfDay(day), ...args);
          onClose();
        }}
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
