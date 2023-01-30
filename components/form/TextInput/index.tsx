import clsx from 'clsx';
import * as React from 'react';
import { ReactNode, useMemo } from 'react';

export interface TextInputProps
  extends Omit<React.AllHTMLAttributes<HTMLInputElement>, 'autoComplete' | 'size'> {
  error?: boolean;
  autoComplete?: boolean | string;
  size?: InputSize;
  iconBeforeElement?: ReactNode;
  iconAfterElement?: ReactNode;
  inputClassName?: string;
}

export enum InputSize {
  MEDIUM = 'medium',
  LARGE = 'large',
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      inputClassName,
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
      <div className={clsx('relative', className)}>
        <input
          ref={ref}
          className={clsx(inputClassName, 'form__input', `form__input--size-${size}`, {
            'form__input--error': Boolean(error),
            'form__input--with-icon-before': Boolean(iconBeforeElement),
            'form__input--with-icon-after': Boolean(iconAfterElement),
          })}
          placeholder={placeholder}
          autoComplete={autoCompleteAttribute}
          type={type}
          {...inputProps}
        />
        {iconBeforeElement && (
          <div className="form__input-icon form__input-icon--before">{iconBeforeElement}</div>
        )}
        {iconAfterElement && (
          <div className="form__input-icon form__input-icon--after">{iconAfterElement}</div>
        )}
      </div>
    );
  },
);
