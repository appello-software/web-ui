import './styles.scss';

import clsx from 'clsx';
import React, { AllHTMLAttributes } from 'react';

import { useCombinedPropsWithKit } from '~/hooks';

export interface RadioInputProps extends AllHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
}

export const RadioInput: React.FC<RadioInputProps> = props => {
  const { checked, label, className, labelClassName, disabled, ...restProps } =
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
      {label && <div className={clsx('radio-input__label-text', labelClassName)}>{label}</div>}
    </label>
  );
};
