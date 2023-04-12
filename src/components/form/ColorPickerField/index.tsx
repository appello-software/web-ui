import { useSwitchValue } from '@appello/common/lib/hooks';
import { useClickAway } from '@appello/web/lib/hooks';
import React, { ReactElement, useRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import { Field, FieldProps } from '~/components/form/Field';
import { InputSize, TextInput } from '~/components/form/TextInput';

interface Props<TName, TFormValues extends FieldValues>
  extends Pick<FieldProps, 'className' | 'label' | 'required'> {
  size?: InputSize;
  name: TName;
  control: Control<TFormValues>;
}

export const ColorPickerField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, Nullable<string>>,
>({
  name,
  control,
  label,
  size,
  className,
  required,
}: Props<TName, TFormValues>): ReactElement => {
  const pickerRef = useRef(null);

  const { field, fieldState } = useController({ name, control });

  const {
    value: isColorPickerOpen,
    toggle: toggleColorPicker,
    off: closeColorPicker,
  } = useSwitchValue(false);

  useClickAway(pickerRef, closeColorPicker);

  return (
    <Field {...{ className, label, required }} error={fieldState.error}>
      <div ref={pickerRef} className="relative">
        {isColorPickerOpen && (
          <div className="absolute bottom-[calc(100%+2px)] w-full">
            <HexColorPicker
              className="w-auto"
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
              <div className="h-5 w-5 rounded" style={{ backgroundColor: field.value }} />
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
