import 'react-day-picker/dist/style.css';
import './styles.module.scss';

import { useSwitchValue } from '@appello/common/lib/hooks';
import { useClickAway } from '@appello/web/lib/hooks';
import { Icon } from '@ui/components/common/Icon';
import { Field } from '@ui/components/form/Field';
import { InputSize, TextInput } from '@ui/components/form/TextInput';
import clsx from 'clsx';
import { format, isWeekend, startOfDay } from 'date-fns';
import React, { ReactElement, useCallback, useMemo, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import { DATE_FORMAT } from '~/constants/dates';

import { formatWeekdayName } from './utils';

interface Props<
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, Nullable<Date>>,
> {
  name: TName;
  control: Control<TFormValues>;

  // field props
  label?: string;
  className?: string;
  required?: boolean;

  // input props
  placeholder?: string;
  inputSize?: InputSize;
}

export const DateField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, Nullable<Date>>,
>({
  name,
  control,
  label,
  className,
  required,
  placeholder = label,
  inputSize,
}: Props<TFormValues, TName>): ReactElement => {
  const controller = useController({ name, control });
  const value = controller.field.value as Nullable<Date>;

  const calendarRef = useRef<HTMLDivElement>(null);
  const [month, setMonth] = useState(() => value ?? new Date());

  const {
    value: isCalendarVisible,
    toggle: toggleCalendar,
    off: closeCalendar,
  } = useSwitchValue(false);

  const handleMonthChange = useCallback((month: Date) => {
    setMonth(month);
  }, []);

  const handleDayChange = React.useCallback(
    (day: Date) => {
      controller.field.onChange(startOfDay(day));
      closeCalendar();
    },
    [controller.field, closeCalendar],
  );

  const renderWeekdayName = useCallback((date: Date) => {
    const name = formatWeekdayName(date);
    return <span className={clsx({ 'text-red': isWeekend(date) })}>{name}</span>;
  }, []);

  const displayDate = useMemo(() => {
    if (!value) {
      return '';
    }

    return format(value, DATE_FORMAT);
  }, [value]);

  useClickAway(calendarRef, closeCalendar);

  return (
    <Field
      label={label}
      className={className}
      childrenClassName="relative z-50"
      error={controller.fieldState.error}
      required={required}
    >
      <div ref={calendarRef}>
        <div>
          <TextInput
            readOnly
            onClick={toggleCalendar}
            placeholder={placeholder}
            size={inputSize}
            value={displayDate}
            error={!!controller.fieldState.error}
            className="cursor-pointer"
            iconBeforeElement={<Icon name="calendar" />}
            iconAfterElement={<Icon name="down-arrow" />}
          />
        </div>
        {isCalendarVisible && (
          <div className="absolute mt-2">
            <DayPicker
              selected={value ?? undefined}
              month={month}
              onMonthChange={handleMonthChange}
              onDayClick={handleDayChange}
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
            />
          </div>
        )}
      </div>
    </Field>
  );
};
