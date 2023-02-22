import './styles.scss';

import clsx from 'clsx';
import React, { AllHTMLAttributes } from 'react';

export const RadioInput: React.FC<AllHTMLAttributes<HTMLInputElement>> = ({
  checked,
  label,
  className,
  disabled,
  ...props
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={clsx('radio', className)}>
      <input
        type="radio"
        className="radio__input"
        checked={checked}
        disabled={disabled}
        {...props}
      />
      <div className="radio__check-mark" />
      {label && <div className="radio__label-text">{label}</div>}
    </label>
  );
};
