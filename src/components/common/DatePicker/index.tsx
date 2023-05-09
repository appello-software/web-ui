import './styles.scss';

import { useSwitchValue, useUpdateEffect } from '@appello/common/lib/hooks';
import clsx from 'clsx';
import { format } from 'date-fns';
import React, { ReactNode, useMemo, useRef, useState } from 'react';
import { Matcher } from 'react-day-picker';

import { DatePickerPopup, Icon } from '~/components';

export interface DatePickerProps {
  placeholder?: ReactNode;
  onChange: (value: Date | null) => void;
  defaultValue?: Date | null;
  disabledDate?: Matcher;
  className?: string;
  leftIconElement?: ReactNode;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  placeholder = 'Choose a date',
  className,
  onChange,
  leftIconElement,
  disabledDate,
  defaultValue,
}) => {
  const { value: isOpen, toggle: toggleCalendar, off: closeCalendar } = useSwitchValue(false);
  const [value, setValue] = useState<Date | null>(defaultValue ?? null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const displayDate = useMemo(() => {
    if (!value) {
      return '';
    }

    return format(value, 'd MMM yyyy');
  }, [value]);

  useUpdateEffect(() => {
    onChange?.(value);
  }, [value, onChange]);

  return (
    <div className={clsx('date-picker', className)}>
      <button type="button" onClick={toggleCalendar} ref={buttonRef} className="date-picker__btn">
        {leftIconElement !== undefined && leftIconElement}
        {leftIconElement === undefined && <Icon name="calendar" size={16} />}
        {displayDate || placeholder}
        <Icon name="down-arrow" size={18} />
      </button>
      {isOpen && (
        <DatePickerPopup
          value={value}
          onChange={setValue}
          callableElement={buttonRef.current}
          disabledDate={disabledDate}
          onClose={closeCalendar}
        />
      )}
    </div>
  );
};
