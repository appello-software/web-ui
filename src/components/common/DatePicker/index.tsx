import './styles.scss';

import { useSwitchValue, useUpdateEffect } from '@appello/common';
import clsx from 'clsx';
import { format } from 'date-fns';
import React, { ReactNode, useMemo, useRef, useState } from 'react';
import { Matcher } from 'react-day-picker';

import { DatePickerBaseProps, DatePickerPopup } from '~/components/common/DatePickerPopup';
import { Icon } from '~/components/common/Icon';
import { useCombinedPropsWithKit } from '~/hooks';

export interface DatePickerProps extends Pick<DatePickerBaseProps, 'yearsLength'> {
  placeholder?: ReactNode;
  onChange: (value: Date | null) => void;
  defaultValue?: Date | null;
  disabledDate?: Matcher;
  className?: string;
  withClear?: boolean;
  leftIconElement?: ReactNode;
}

export const DatePicker: React.FC<DatePickerProps> = props => {
  const {
    placeholder = 'Choose a date',
    className,
    onChange,
    leftIconElement,
    disabledDate,
    defaultValue,
    yearsLength,
    withClear,
  } = useCombinedPropsWithKit({
    name: 'DatePicker',
    props,
  });

  const { value: isOpen, toggle: toggleCalendar, off: closeCalendar } = useSwitchValue(false);
  const [value, setValue] = useState<Date | null>(defaultValue ?? null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const displayDate = useMemo(() => {
    if (!value) {
      return '';
    }

    return format(value, 'd MMM yyyy');
  }, [value]);

  const clearDate = () => {
    setValue(null);
    onChange?.(null);
  };

  useUpdateEffect(() => {
    onChange?.(value);
  }, [value]);

  return (
    <div className={clsx('date-picker', className)}>
      <button className="date-picker__btn" ref={buttonRef} type="button" onClick={toggleCalendar}>
        {leftIconElement !== undefined && leftIconElement}
        {leftIconElement === undefined && <Icon name="calendar" size={16} />}
        {displayDate || placeholder}

        {withClear && displayDate ? null : <Icon name="down-arrow" size={18} />}
      </button>
      {withClear && displayDate && (
        <button type="button" onClick={clearDate}>
          <Icon name="close" size={16} />
        </button>
      )}

      {isOpen && (
        <DatePickerPopup
          callableElement={buttonRef.current}
          disabledDate={disabledDate}
          value={value}
          yearsLength={yearsLength}
          onChange={setValue}
          onClose={closeCalendar}
        />
      )}
    </div>
  );
};
