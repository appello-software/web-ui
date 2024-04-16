import './styles.scss';

import { useSwitchValue } from '@appello/common';
import { useClickAway } from '@appello/web-kit';
import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import { Icon } from '~/components/common/Icon';
import { Field, FieldProps } from '~/components/form/Field';
import { InputSize, TextInput } from '~/components/form/TextInput';
import { useCombinedPropsWithKit } from '~/hooks';

export interface ColorPickerFieldProps<TName, TFormValues extends FieldValues>
  extends Pick<FieldProps, 'className' | 'label' | 'required' | 'labelChildren'> {
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
  const { name, control, label, size, className, required, labelChildren } =
    useCombinedPropsWithKit({
      name: 'ColorPickerField',
      props,
    });

  const { field, fieldState } = useController({ name, control });

  const {
    value: isColorPickerOpen,
    toggle: toggleColorPicker,
    off: closeColorPicker,
  } = useSwitchValue(false);

  const { ref: pickerRef } = useClickAway<HTMLDivElement>(closeColorPicker);

  return (
    <Field
      {...{ label, required, labelChildren }}
      className={clsx(generateClassName(), className)}
      error={fieldState.error}
    >
      <div className={generateClassName('input-wrapper')} ref={pickerRef}>
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
          iconAfterElement={
            <Icon
              className={clsx({ [generateClassName('icon-after')]: isColorPickerOpen })}
              name="down-arrow"
            />
          }
          iconBeforeElement={
            field.value && (
              <div
                className={generateClassName('color')}
                style={{ backgroundColor: field.value }}
              />
            )
          }
          label={label}
          placeholder="Select colour"
          size={size}
          value={field.value ?? ''}
          onClick={toggleColorPicker}
        />
      </div>
    </Field>
  );
};
