import './styles.scss';

import clsx from 'clsx';
import React, { AllHTMLAttributes, ReactNode } from 'react';

import { useCombinedPropsWithKit } from '~/hooks';

export interface RadioInputProps extends Omit<AllHTMLAttributes<HTMLInputElement>, 'label'> {
  label?: ReactNode | string;
  labelClassName?: string;
}

export const RadioInput: React.FC<RadioInputProps> = props => {
  const { checked, label, labelClassName, className, disabled, ...restProps } =
    useCombinedPropsWithKit({
      name: 'RadioInput',
      props,
    });

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={clsx('radio-input', className)}>
      <input
        checked={checked}
        className="radio-input__input"
        disabled={disabled}
        type="radio"
        {...restProps}
      />
      <div className="radio-input__check-mark" />
      {typeof label === 'string' ? (
        <div className={clsx('radio-input__label-text', labelClassName)}>{label}</div>
      ) : (
        label
      )}
    </label>
  );
};
