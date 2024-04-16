import { useSwitchValue } from '@appello/common';
import * as React from 'react';
import { ReactNode } from 'react';
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
  labelChildren?: ReactNode;
}

export const PasswordField = <TFormValues extends FieldValues>(
  props: PasswordFieldProps<TFormValues>,
): React.ReactElement => {
  const { name, label, control, labelChildren, className, placeholder, ...textInputProps } =
    useCombinedPropsWithKit({
      name: 'PasswordField',
      props,
    });

  const controller = useController({ name, control });

  const { value: isPasswordVisible, toggle: togglePasswordVisibility } = useSwitchValue(false);

  return (
    <Field
      className={className}
      error={controller.fieldState.error}
      label={label}
      labelChildren={labelChildren}
    >
      <div className={styles['input-wrapper']}>
        <TextInput
          {...controller.field}
          autoCapitalize="none"
          error={!!controller.fieldState.error}
          iconAfterElement={<Icon name={!isPasswordVisible ? 'eye' : 'eye-crossed'} />}
          inputClassName={styles['input']}
          placeholder={placeholder ?? label}
          type={isPasswordVisible ? 'text' : 'password'}
          onIconAfterClick={togglePasswordVisibility}
          {...textInputProps}
        />
      </div>
    </Field>
  );
};
