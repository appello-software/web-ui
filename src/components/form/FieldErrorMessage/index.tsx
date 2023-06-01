import clsx from 'clsx';
import React from 'react';
import { FieldError } from 'react-hook-form';

import { useCombinedPropsWithKit } from '~/hooks';

export interface FieldErrorMessageProps {
  error?: FieldError;
  className?: string;
}

export const FieldErrorMessage: React.FC<FieldErrorMessageProps> = props => {
  const { error, className } = useCombinedPropsWithKit({
    name: 'FieldErrorMessage',
    props,
  });

  if (!error) {
    return null;
  }
  return <p className={clsx('form__error', className)}>{error.message}</p>;
};
