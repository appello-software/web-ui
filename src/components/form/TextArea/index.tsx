import './styles.scss';

import clsx from 'clsx';
import * as React from 'react';
import { useMemo } from 'react';

import { useCombinedPropsWithKit } from '~/hooks';

export interface TextAreaProps
  extends Omit<React.AllHTMLAttributes<HTMLTextAreaElement>, 'autoComplete' | 'size'> {
  error?: boolean;
  autoComplete?: boolean | string;
}
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const {
    className,
    autoComplete,
    error = false,
    maxLength,
    value,
    ...inputProps
  } = useCombinedPropsWithKit({
    name: 'TextArea',
    props,
  });

  const autoCompleteAttribute = useMemo(() => {
    if (typeof autoComplete === 'boolean') {
      return autoComplete ? undefined : 'off';
    }
    return autoComplete;
  }, [autoComplete]);

  return (
    <div className="textarea">
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
        autoComplete={autoCompleteAttribute}
        maxLength={maxLength}
        value={value}
        {...inputProps}
      />
      {maxLength !== undefined && (
        <div className="textarea__counter">
          {`${value ?? ''}`.length}/{maxLength}
        </div>
      )}
    </div>
  );
});
