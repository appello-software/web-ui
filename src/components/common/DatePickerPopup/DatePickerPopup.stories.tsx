import { useSwitchValue } from '@appello/common/lib/hooks';
import type { Meta } from '@storybook/react';
import React, { useRef, useState } from 'react';

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
      <button type="button" onClick={toggleCalendar} ref={buttonRef}>
        show calendar
      </button>
      {isOpen && (
        <DatePickerPopup
          value={date}
          onChange={setDate}
          callableElement={buttonRef.current}
          onClose={closeCalendar}
        />
      )}
    </div>
  );
};
