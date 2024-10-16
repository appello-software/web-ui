import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

import { FieldErrorMessage } from '~/components/form/FieldErrorMessage';
import { useCombinedPropsWithKit } from '~/hooks';

export interface FieldProps {
  label?: string;
  labelChildren?: ReactNode;
  error?: FieldError;
  className?: string;
  children: ReactNode;
  labelClassName?: string;
  childrenClassName?: string;
  required?: boolean;
}

export const Field: React.FC<FieldProps> = props => {
  const {
    label,
    error,
    className,
    required,
    children,
    labelClassName,
    childrenClassName,
    labelChildren,
  } = useCombinedPropsWithKit({
    name: 'Field',
    props,
  });

  return (
    <div className={clsx('form__field', 'form__field-row', className)}>
      {label && (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className={clsx('form__label', labelClassName)} title={label}>
          {label}
          {required ? <span className="form__label-required"> *</span> : null}
          {labelChildren}
        </label>
      )}
      <div className={childrenClassName}>{children}</div>
      <FieldErrorMessage error={error} />
    </div>
  );
};
