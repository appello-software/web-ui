import formStyles from '@ui/components/form/styles.module.scss';
import clsx from 'clsx';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const InlineFields: React.FC<Props> = ({ children }) => {
  return (
    <div className={clsx(formStyles['form__inline-fields'], formStyles['form__field-row'])}>
      {children}
    </div>
  );
};
