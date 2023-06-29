import './styles.scss';

import clsx from 'clsx';
import React, { AllHTMLAttributes } from 'react';

import { useCombinedPropsWithKit } from '~/hooks';

export interface RadioInputProps extends AllHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const RadioInput: React.FC<RadioInputProps> = props => {
  const { checked, label, className, disabled, ...restProps } = useCombinedPropsWithKit({
    name: 'RadioInput',
    props,
  });

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={clsx('appello-radio-input', className)}>
      <input
        type="radio"
        className="appello-radio-input__input"
        checked={checked}
        disabled={disabled}
        {...restProps}
      />
      <div className="appello-radio-input__check-mark" />
      {label && <div className="appello-radio-input__label-text">{label}</div>}
    </label>
  );
};
