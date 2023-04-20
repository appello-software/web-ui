import './styles.scss';

import { useSwitchValue } from '@appello/common/lib/hooks';
import clsx from 'clsx';
import React, { ReactElement, useRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import { Field, FieldProps } from '~/components/form/Field';
import { InputSize, TextInput } from '~/components/form/TextInput';
import { useClickAway } from '~/hooks/useClickAway';

export interface ColorPickerFieldProps<TName, TFormValues extends FieldValues>
  extends Pick<FieldProps, 'className' | 'label' | 'required'> {
  size?: InputSize;
  name: TName;
  control: Control<TFormValues>;
}

export const ColorPickerField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, string | null>,
>({
  name,
  control,
  label,
  size,
  className,
  required,
}: ColorPickerFieldProps<TName, TFormValues>): ReactElement => {
  const pickerRef = useRef(null);

  const { field, fieldState } = useController({ name, control });

  const {
    value: isColorPickerOpen,
    toggle: toggleColorPicker,
    off: closeColorPicker,
  } = useSwitchValue(false);

  useClickAway(pickerRef, closeColorPicker);

  return (
    <Field
      {...{ label, required }}
      error={fieldState.error}
      className={clsx('color-picker-field', className)}
    >
      <div ref={pickerRef} className="color-picker-field__input-wrapper">
        {isColorPickerOpen && (
          <div className="color-picker-field__picker">
            <HexColorPicker
              className="color-picker-field__picker-inner"
              color={field.value || '#ffffff'}
              onChange={field.onChange}
            />
          </div>
        )}
        <TextInput
          readOnly
          onClick={toggleColorPicker}
          iconBeforeElement={
            field.value && (
              <div className="color-picker-field__color" style={{ backgroundColor: field.value }} />
            )
          }
          placeholder="Select colour"
          size={size}
          label={label}
          value={field.value ?? ''}
        />
      </div>
    </Field>
  );
};
