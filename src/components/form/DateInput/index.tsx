import { useSwitchValue } from '@appello/common';
import clsx from 'clsx';
import { format } from 'date-fns';
import React, { ReactElement, useMemo, useRef } from 'react';
import { Matcher } from 'react-day-picker';

import {
  DatePickerBaseProps,
  DatePickerDefaultProps,
  DatePickerPopup,
  DatePickerRangeProps,
} from '~/components/common/DatePickerPopup';
import { Icon } from '~/components/common/Icon';
import { InputSize, TextInput } from '~/components/form/TextInput';
import { useAppelloKit } from '~/ctx';
import { useCombinedPropsWithKit } from '~/hooks';

import styles from './styles.module.scss';

export type DateInputProps = (DatePickerRangeProps | DatePickerDefaultProps) &
  Pick<DatePickerBaseProps, 'yearsLength'> & {
    placeholder?: string;
    inputSize?: InputSize;
    error?: boolean;
    className?: string;
    disabledDate?: Matcher;
    iconAfterName?: string;
    disabled?: boolean;
  };

export const DateInput: React.FC<DateInputProps> = (props): ReactElement => {
  const {
    className,
    placeholder,
    inputSize,
    value,
    error,
    onChange,
    mode,
    disabledDate,
    iconAfterName = 'down-arrow',
    yearsLength,
    disabled,
  } = useCombinedPropsWithKit({
    name: 'DateInput',
    props,
  });

  const { dateFormat } = useAppelloKit();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    value: isCalendarVisible,
    toggle: toggleCalendar,
    off: closeCalendar,
  } = useSwitchValue(false);

  const handleDayChange: DatePickerDefaultProps['onChange'] = React.useCallback(
    (day, ...args) => {
      if (mode === undefined) {
        onChange(day, ...args);
      }
    },
    [mode, onChange],
  );

  const handleRangeChange: DatePickerRangeProps['onChange'] = React.useCallback(
    (range, ...args) => {
      if (mode === 'range') {
        onChange(range, ...args);
      }
    },
    [mode, onChange],
  );

  const displayDate = useMemo(() => {
    if (!value) {
      return '';
    }

    if (mode === 'range') {
      const { to, from } = value;

      if (!from) {
        return '';
      }

      if (!to) {
        return format(from, 'd MMM yyyy');
      }

      return `${format(from, 'd MMM yyyy')} - ${format(to, 'd MMM yyyy')}`;
    }

    return format(value, dateFormat);
  }, [value, mode, dateFormat]);

  const propsByMode =
    mode === 'range'
      ? {
          mode: 'range' as const,
          value,
          onChange: handleRangeChange,
          yearsLength,
        }
      : {
          mode: undefined,
          value,
          onChange: handleDayChange,
          yearsLength,
        };

  return (
    <div className={clsx(styles['date-input'], className)} ref={containerRef}>
      <div>
        <TextInput
          readOnly
          disabled={disabled}
          error={error}
          iconAfterElement={
            <Icon
              className={clsx({
                [styles['date-input__arrow']]: isCalendarVisible,
                [styles['date-input__arrow__disabled']]: disabled,
              })}
              name={iconAfterName || 'down-arrow'}
            />
          }
          iconBeforeElement={
            <Icon
              className={clsx({
                [styles['date-input__arrow__disabled']]: disabled,
              })}
              name="calendar"
            />
          }
          inputClassName={styles['date-input__input']}
          placeholder={placeholder}
          ref={inputRef}
          size={inputSize}
          value={displayDate}
          onClick={toggleCalendar}
        />
      </div>
      {isCalendarVisible && (
        <DatePickerPopup
          {...propsByMode}
          callableElement={inputRef.current}
          disabledDate={disabledDate}
          onClose={closeCalendar}
        />
      )}
    </div>
  );
};
