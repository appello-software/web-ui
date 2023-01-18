import clsx from 'clsx';
import * as React from 'react';
import { useMemo } from 'react';

export interface TextAreaProps
  extends Omit<React.AllHTMLAttributes<HTMLTextAreaElement>, 'autoComplete' | 'size'> {
  error?: boolean;
  autoComplete?: boolean | string;
}
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, placeholder, autoComplete, error = false, ...inputProps }, ref) => {
    const autoCompleteAttribute = useMemo(() => {
      if (typeof autoComplete === 'boolean') {
        return autoComplete ? undefined : 'off';
      }
      return autoComplete;
    }, [autoComplete]);

    return (
      <div className="relative">
        <textarea
          ref={ref}
          className={clsx(
            'form__input',
            'form__textarea',
            {
              'form__input--error': Boolean(error),
            },
            className,
          )}
          placeholder={placeholder}
          autoComplete={autoCompleteAttribute}
          {...inputProps}
        />
      </div>
    );
  },
);
