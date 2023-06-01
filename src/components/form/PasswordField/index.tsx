import { useSwitchValue } from '@appello/common/lib/hooks';
import * as React from 'react';
import { Control, FieldPathByValue, FieldValues, useController } from 'react-hook-form';

import { Icon } from '~/components/common/Icon';
import { Field } from '~/components/form/Field';
import { useCombinedPropsWithKit } from '~/hooks';

import { InputSize, TextInput, TextInputProps } from '../TextInput';
import styles from './styles.module.scss';

export interface PasswordFieldProps<TFormValues extends FieldValues> extends TextInputProps {
  name: FieldPathByValue<TFormValues, string>;
  control: Control<TFormValues>;

  // field props
  label?: string;
  className?: string;

  // input props
  autoComplete?: boolean | string;
  size?: InputSize;
}

export const PasswordField = <TFormValues extends FieldValues>(
  props: PasswordFieldProps<TFormValues>,
): React.ReactElement => {
  const { name, label, control, className, placeholder, ...textInputProps } =
    useCombinedPropsWithKit({
      name: 'PasswordField',
      props,
    });

  const controller = useController({ name, control });

  const { value: isPasswordVisible, toggle: togglePasswordVisibility } = useSwitchValue(false);

  return (
    <Field label={label} error={controller.fieldState.error} className={className}>
      <div className={styles['input-wrapper']}>
        <TextInput
          {...controller.field}
          error={!!controller.fieldState.error}
          autoCapitalize="none"
          type={isPasswordVisible ? 'text' : 'password'}
          inputClassName={styles['input']}
          placeholder={placeholder ?? label}
          iconAfterElement={<Icon name={isPasswordVisible ? 'eye' : 'eye-crossed'} />}
          onIconAfterClick={togglePasswordVisibility}
          {...textInputProps}
        />
      </div>
    </Field>
  );
};
