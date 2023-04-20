import './styles.scss';

import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

export enum BadgeColor {
  GREEN = 'green',
  GRAY = 'gray',
  BLUE = 'blue',
  RED = 'red',
}

export interface BadgeProps {
  children: ReactNode;
  color: BadgeColor;
}

export const Badge: FC<BadgeProps> = ({ children, color }) => {
  return (
    <div className={clsx('badge', `badge--${color}`)}>
      <p className="badge__text">{children}</p>
    </div>
  );
};
