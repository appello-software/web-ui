import './styles.scss';

import clsx from 'clsx';
import * as React from 'react';
import { useMemo } from 'react';

import { useCombinedPropsWithKit } from '~/hooks';

export interface TextAreaProps
  extends Omit<React.AllHTMLAttributes<HTMLTextAreaElement>, 'autoComplete' | 'size'> {
  error?: boolean;
  autoComplete?: boolean | string;
  defaultValue?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const {
    className,
    autoComplete,
    error = false,
    maxLength,
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
        autoComplete={autoCompleteAttribute}
        className={clsx(
          'form__input',
          'form__textarea',
          {
            'form__input--error': Boolean(error),
          },
          className,
        )}
        maxLength={maxLength}
        ref={ref}
        {...inputProps}
      />
      {maxLength !== undefined && (
        <div className="textarea__counter">
          {`${inputProps.value ?? ''}`.length}/{maxLength}
        </div>
      )}
    </div>
  );
});
