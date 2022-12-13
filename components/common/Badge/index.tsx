import './styles.scss';

import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

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
    <div className={clsx('badge', `badge--${color}`)}>
      <p className="text-c1 font-bold">{children}</p>
    </div>
  );
};
