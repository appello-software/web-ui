import clsx from 'clsx';
import React, { useId } from 'react';

import { Icon } from '~/components/common/Icon';
import { useCombinedPropsWithKit } from '~/hooks';

import styles from './styles.module.scss';

export interface CheckboxProps extends React.AllHTMLAttributes<HTMLInputElement> {
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { label, className, ...inputProps } = useCombinedPropsWithKit({
    name: 'Checkbox',
    props,
  });

  const id = useId();
  const checkboxId = `checkbox-${id}`;

  return (
    <label className={clsx(styles['container'], className)} htmlFor={checkboxId}>
      <input
        className={styles['input']}
        id={checkboxId}
        ref={ref}
        type="checkbox"
        {...inputProps}
      />
      <div className={styles['square']}>
        <Icon className={styles['square__icon']} name="check" size={18} />
      </div>
      {label && <p className={styles['label']}>{label}</p>}
    </label>
  );
});
