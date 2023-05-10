import { useSwitchValue } from '@appello/common/lib/hooks';
import clsx from 'clsx';
import { format } from 'date-fns';
import React, { ReactElement, useMemo, useRef } from 'react';
import { Matcher } from 'react-day-picker';

import { DatePickerPopup } from '~/components/common/DatePickerPopup';
import { Icon } from '~/components/common/Icon';
import { InputSize, TextInput } from '~/components/form/TextInput';
import { useAppelloKit } from '~/ctx';

import styles from './styles.module.scss';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    value: isCalendarVisible,
    toggle: toggleCalendar,
    off: closeCalendar,
  } = useSwitchValue(false);

  const handleDayChange = React.useCallback(
    (day: Date) => {
      onChange(day as TValue);
    },
    [onChange],
  );

  const displayDate = useMemo(() => {
    if (!value) {
      return '';
    }

    return format(value, dateFormat);
  }, [value, dateFormat]);

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
              name="down-arrow"
              className={clsx({ [styles['date-input__arrow']]: isCalendarVisible })}
            />
          }
        />
      </div>
      {isCalendarVisible && (
        <DatePickerPopup
          value={value}
          onChange={handleDayChange}
          disabledDate={disabledDate}
          callableElement={inputRef.current}
          onClose={closeCalendar}
        />
      )}
    </div>
  );
};
