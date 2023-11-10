import { useSwitchValue } from '@appello/common';
import type { Meta } from '@storybook/react';
import React, { useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { DatePickerPopup } from '.';

const meta = {
  title: 'Components/DatePickerPopup',
  component: DatePickerPopup,
  tags: ['autodocs'],
} satisfies Meta<typeof DatePickerPopup>;

export default meta;

export const Standard: React.FC = () => {
  const { value: isOpen, toggle: toggleCalendar, off: closeCalendar } = useSwitchValue(false);
  const [date, setDate] = useState<Date | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <button ref={buttonRef} type="button" onClick={toggleCalendar}>
        show calendar
      </button>
      {isOpen && (
        <DatePickerPopup
          callableElement={buttonRef.current}
          value={date}
          onChange={setDate}
          onClose={closeCalendar}
        />
      )}
    </div>
  );
};

export const WithRange: React.FC = () => {
  const { value: isOpen, toggle: toggleCalendar, off: closeCalendar } = useSwitchValue(false);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <button ref={buttonRef} type="button" onClick={toggleCalendar}>
        show calendar
      </button>
      {isOpen && (
        <DatePickerPopup
          callableElement={buttonRef.current}
          mode="range"
          value={dateRange}
          onChange={setDateRange}
          onClose={closeCalendar}
        />
      )}
    </div>
  );
};
