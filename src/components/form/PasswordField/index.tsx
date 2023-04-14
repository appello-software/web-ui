import { useSwitchValue } from '@appello/common/lib/hooks';
import * as React from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

import { Icon } from '~/components/common/Icon';
import { Field } from '~/components/form/Field';

import { InputSize, TextInput, TextInputProps } from '../TextInput';
import styles from './styles.module.scss';

interface Props<TFormValues extends FieldValues> extends TextInputProps {
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;

  // field props
  label?: string;
  className?: string;

  // input props
  autoComplete?: boolean | string;
  size?: InputSize;
}

export const PasswordField = <TFormValues extends FieldValues>({
  name,
  label,
  control,
  className,
  placeholder = label,
  ...textInputProps
}: Props<TFormValues>): React.ReactElement => {
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
          placeholder={placeholder}
          {...textInputProps}
        />
        <button type="button" onClick={togglePasswordVisibility} className={styles['toggle']}>
          {isPasswordVisible && <Icon name="eye" size={20} />}
          {!isPasswordVisible && <Icon name="eye-crossed" size={20} />}
        </button>
      </div>
    </Field>
  );
};
