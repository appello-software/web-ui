import './styles.scss';

import { useSwitchValue } from '@appello/common/lib/hooks';
import clsx from 'clsx';
import { format } from 'date-fns';
import React, { ReactNode, useMemo, useRef, useState } from 'react';

import { DatePickerPopup, Icon } from '~/components';

export interface DatePickerProps {
  placeholder?: ReactNode;
  onChange: (value: Date | null) => void;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  placeholder = 'Choose a date',
  className,
}) => {
  const { value: isOpen, toggle: toggleCalendar, off: closeCalendar } = useSwitchValue(false);
  const [value, setValue] = useState<Date | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const displayDate = useMemo(() => {
    if (!value) {
      return '';
    }

    return format(value, 'd MMM yyyy');
  }, [value]);

  return (
    <div className={clsx('date-picker', className)}>
      <button type="button" onClick={toggleCalendar} ref={buttonRef} className="date-picker__btn">
        <Icon name="calendar" size={16} />
        {displayDate || placeholder}
        <Icon name="down-arrow" size={18} />
      </button>
      {isOpen && (
        <DatePickerPopup
          value={value}
          onChange={setValue}
          callableElement={buttonRef.current}
          onClose={closeCalendar}
        />
      )}
    </div>
  );
};