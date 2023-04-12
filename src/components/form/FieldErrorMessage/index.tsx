import clsx from 'clsx';
import React from 'react';
import { FieldError } from 'react-hook-form';

interface Props {
  error?: FieldError;
  className?: string;
}

export const FieldErrorMessage: React.FC<Props> = ({ error, className }) => {
  if (!error) {
    return null;
  }
  return <p className={clsx('form__error', className)}>{error.message}</p>;
};
