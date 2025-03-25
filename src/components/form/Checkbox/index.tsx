import clsx from 'clsx';
import React, { ReactNode, useId } from 'react';

import { Icon } from '~/components/common/Icon';
import { useCombinedPropsWithKit } from '~/hooks';

import styles from './styles.module.scss';

export interface CheckboxProps extends Omit<React.AllHTMLAttributes<HTMLInputElement>, 'label'> {
  label?: string | ReactNode | null;
  borderColor?: string;
  checkedColor?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { label, className, checkedColor, borderColor, ...inputProps } = useCombinedPropsWithKit({
    name: 'Checkbox',
    props,
  });

  const id = useId();
  const checkboxId = `checkbox-${id}`;

  return (
    <label
      className={clsx(styles['container'], className)}
      htmlFor={checkboxId}
      style={{ '--checked-bg-color': checkedColor } as React.CSSProperties}
    >
      <input
        className={styles['input']}
        id={checkboxId}
        ref={ref}
        type="checkbox"
        {...inputProps}
      />
      <div className={styles['square']} style={{ borderColor }}>
        <Icon className={styles['square__icon']} name="check" size={18} />
      </div>
      {typeof label === 'string' ? <p className={styles['label']}>{label}</p> : label}
    </label>
  );
});
