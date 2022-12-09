import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

import styles from './styles.module.scss';

export enum BadgeColor {
  GREEN = 'green',
  GRAY = 'gray',
}

interface Props {
  children: ReactNode;
  color: BadgeColor;
}

export const Badge: FC<Props> = ({ children, color }) => {
  return (
    <div className={clsx(styles['badge'], styles[`badge--${color}`])}>
      <p className="text-c1 font-bold">{children}</p>
    </div>
  );
};
