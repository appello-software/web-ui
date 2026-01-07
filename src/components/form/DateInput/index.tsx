import { Nullable, useSwitchValue } from '@appello/common';
import clsx from 'clsx';
import { format } from 'date-fns';
import React, { ReactElement, ReactNode, useMemo, useRef } from 'react';
import { DateRange, Matcher } from 'react-day-picker';

import {
  DatePickerBaseProps,
  DatePickerDefaultProps,
  DatePickerPopup,
  DatePickerRangeProps,
} from '~/components/common/DatePickerPopup';
import { Icon, IconName } from '~/components/common/Icon';
import { InputSize, TextInput } from '~/components/form/TextInput';
import { useAppelloKit } from '~/ctx';
import { useCombinedPropsWithKit } from '~/hooks';

import styles from './styles.module.scss';

export type DateInputProps = (DatePickerRangeProps | DatePickerDefaultProps) &
  Pick<
    DatePickerBaseProps,
    | 'yearsLength'
    | 'toYear'
    | 'fromYear'
    | 'weekStartsOn'
    | 'containerWrapperClassName'
    | 'containerClassName'
  > & {
    placeholder?: string;
    inputSize?: InputSize;
    error?: boolean;
    className?: string;
    disabledDate?: Matcher;
    iconAfterName?: IconName;
    disabled?: boolean;
    rightElement?: ReactNode;
    iconAfterElementClassName?: string;
    inputClassName?: string;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    formatInputValue?: (value: Date | Nullable<DateRange>) => string;
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
    iconAfterName = 'downArrow',
    yearsLength,
    disabled,
    rightElement,
    iconAfterElementClassName,
    inputClassName,
    position,
    formatInputValue,
    fromYear,
    toYear,
    weekStartsOn,
    containerWrapperClassName,
    containerClassName,
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
        return format(from, dateFormat);
      }

      return `${format(from, dateFormat)} - ${format(to, dateFormat)}`;
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
              height={20}
              name={iconAfterName}
              width={20}
            />
          }
          iconAfterElementClassName={iconAfterElementClassName}
          iconBeforeElement={
            <Icon
              className={clsx({
                [styles['date-input__arrow__disabled']]: disabled,
              })}
              height={20}
              name="calendar"
              width={20}
            />
          }
          inputClassName={clsx(styles['date-input__input'], inputClassName)}
          placeholder={placeholder}
          ref={inputRef}
          rightElement={rightElement}
          size={inputSize}
          value={formatInputValue?.(value) ?? displayDate}
          onClick={toggleCalendar}
        />
      </div>
      {isCalendarVisible && (
        <DatePickerPopup
          {...propsByMode}
          callableElement={inputRef.current}
          containerClassName={containerClassName}
          containerWrapperClassName={containerWrapperClassName}
          disabledDate={disabledDate}
          fromYear={fromYear}
          position={position}
          toYear={toYear}
          weekStartsOn={weekStartsOn}
          onClose={closeCalendar}
        />
      )}
    </div>
  );
};
