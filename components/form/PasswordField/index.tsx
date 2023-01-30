import { useSwitchValue } from '@appello/common/lib/hooks';
import { Icon } from '@ui/components/common/Icon';
import { Field } from '@ui/components/form/Field';
import * as React from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

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
  ...textInputProps
}: Props<TFormValues>): React.ReactElement => {
  const controller = useController({ name, control });
  const { value: isPasswordVisible, toggle: togglePasswordVisibility } = useSwitchValue(false);

  return (
    <Field label={label} error={controller.fieldState.error} className={className}>
      <div className="relative">
        <TextInput
          {...controller.field}
          error={!!controller.fieldState.error}
          autoCapitalize="none"
          type={isPasswordVisible ? 'text' : 'password'}
          inputClassName="pr-[2.81rem]"
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
