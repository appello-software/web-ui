import { useSwitchValue } from '@appello/common/lib/hooks';
import clsx from 'clsx';
import { format } from 'date-fns';
import React, { ReactElement, useMemo, useRef } from 'react';
import { Matcher } from 'react-day-picker';

import {
  DatePickerDefaultProps,
  DatePickerPopup,
  DatePickerRangeProps,
} from '~/components/common/DatePickerPopup';
import { Icon } from '~/components/common/Icon';
import { InputSize, TextInput } from '~/components/form/TextInput';
import { useAppelloKit } from '~/ctx';
import { useCombinedPropsWithKit } from '~/hooks';

import styles from './styles.module.scss';

export type DateInputProps = (DatePickerRangeProps | DatePickerDefaultProps) & {
  placeholder?: string;
  inputSize?: InputSize;
  error?: boolean;
  className?: string;
  disabledDate?: Matcher;
  iconAfterName?: string;
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
        }
      : {
          mode: undefined,
          value,
          onChange: handleDayChange,
        };

  return (
    <div ref={containerRef} className={clsx(styles['date-input'], className)}>
      <div>
        <TextInput
          readOnly
          ref={inputRef}
          onClick={toggleCalendar}
          placeholder={placeholder}
          size={inputSize}
          value={displayDate}
          error={error}
          inputClassName={styles['date-input__input']}
          iconBeforeElement={<Icon name="calendar" />}
          iconAfterElement={
            <Icon
              name={iconAfterName || 'down-arrow'}
              className={clsx({ [styles['date-input__arrow']]: isCalendarVisible })}
            />
          }
        />
      </div>
      {isCalendarVisible && (
        <DatePickerPopup
          {...propsByMode}
          disabledDate={disabledDate}
          callableElement={inputRef.current}
          onClose={closeCalendar}
        />
      )}
    </div>
  );
};
