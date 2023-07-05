import './styles.scss';

import { useSwitchValue } from '@appello/common/lib/hooks';
import clsx from 'clsx';
import React, { ReactElement, useRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import { Icon } from '~/components/common/Icon';
import { Field, FieldProps } from '~/components/form/Field';
import { InputSize, TextInput } from '~/components/form/TextInput';
import { useCombinedPropsWithKit } from '~/hooks';
import { useClickAway } from '~/hooks/useClickAway';

export interface ColorPickerFieldProps<TName, TFormValues extends FieldValues>
  extends Pick<FieldProps, 'className' | 'label' | 'required'> {
  size?: InputSize;
  name: TName;
  control: Control<TFormValues>;
}

const generateClassName = (child?: string): string =>
  child ? `color-picker-field__${child}` : 'color-picker-field';

export const ColorPickerField = <
  TFormValues extends FieldValues,
  TName extends FieldPathByValue<TFormValues, string | null>,
>(
  props: ColorPickerFieldProps<TName, TFormValues>,
): ReactElement => {
  const { name, control, label, size, className, required } = useCombinedPropsWithKit({
    name: 'ColorPickerField',
    props,
  });

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
      className={clsx(generateClassName(), className)}
    >
      <div ref={pickerRef} className={generateClassName('input-wrapper')}>
        {isColorPickerOpen && (
          <div className={generateClassName('picker')}>
            <HexColorPicker
              className={generateClassName('picker-inner')}
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
              <div
                className={generateClassName('color')}
                style={{ backgroundColor: field.value }}
              />
            )
          }
          placeholder="Select colour"
          size={size}
          label={label}
          value={field.value ?? ''}
          iconAfterElement={
            <Icon
              name="down-arrow"
              className={clsx({ [generateClassName('icon-after')]: isColorPickerOpen })}
            />
          }
        />
      </div>
    </Field>
  );
};
