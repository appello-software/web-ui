import clsx from 'clsx';
import * as React from 'react';
import { ReactNode, useMemo } from 'react';

import formStyles from '../styles.module.scss';

export interface TextInputProps
  extends Omit<React.AllHTMLAttributes<HTMLInputElement>, 'autoComplete' | 'size'> {
  error?: boolean;
  autoComplete?: boolean | string;
  size?: InputSize;
  iconBeforeElement?: ReactNode;
  iconAfterElement?: ReactNode;
}

export enum InputSize {
  MEDIUM = 'medium',
  LARGE = 'large',
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      placeholder,
      autoComplete,
      error = false,
      size = InputSize.MEDIUM,
      type = 'text',
      iconBeforeElement,
      iconAfterElement,
      ...inputProps
    },
    ref,
  ) => {
    const autoCompleteAttribute = useMemo(() => {
      if (typeof autoComplete === 'boolean') {
        return autoComplete ? undefined : 'off';
      }
      return autoComplete;
    }, [autoComplete]);

    return (
      <div className="relative">
        <input
          ref={ref}
          className={clsx(
            className,
            formStyles['form__input'],
            formStyles[`form__input--size-${size}`],
            {
              [`${formStyles['form__input--error']}`]: Boolean(error),
              [`${formStyles['form__input--with-icon-before']}`]: Boolean(iconBeforeElement),
              [`${formStyles['form__input--with-icon-after']}`]: Boolean(iconAfterElement),
            },
          )}
          placeholder={placeholder}
          autoComplete={autoCompleteAttribute}
          type={type}
          {...inputProps}
        />
        {iconBeforeElement && (
          <div
            className={clsx(formStyles['form__input-icon'], formStyles['form__input-icon--before'])}
          >
            {iconBeforeElement}
          </div>
        )}
        {iconAfterElement && (
          <div
            className={clsx(formStyles['form__input-icon'], formStyles['form__input-icon--after'])}
          >
            {iconAfterElement}
          </div>
        )}
      </div>
    );
  },
);
