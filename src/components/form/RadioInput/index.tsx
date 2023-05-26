import './styles.scss';

import clsx from 'clsx';
import React, { AllHTMLAttributes } from 'react';

export interface RadioInputProps extends AllHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const RadioInput: React.FC<RadioInputProps> = ({
  checked,
  label,
  className,
  disabled,
  ...props
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={clsx('radio-input', className)}>
      <input
        type="radio"
        className="radio-input__input"
        checked={checked}
        disabled={disabled}
        {...props}
      />
      <div className="radio-input__check-mark" />
      {label && <div className="radio-input__label-text">{label}</div>}
    </label>
  );
};
