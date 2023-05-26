import './styles.scss';

import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

import { Icon } from '~/components';

export enum BadgeColor {
  GREEN = 'green',
  GRAY = 'gray',
  BLUE = 'blue',
  RED = 'red',
  ORANGE = 'orange',
}

export interface BadgeProps {
  children: ReactNode;
  color: BadgeColor;
  icon?: string;
  filled?: boolean;
}

export const Badge: FC<BadgeProps> = ({ children, color, icon, filled }) => {
  return (
    <div className={clsx('badge', `badge--${color}`, { 'badge--filled': filled })}>
      {icon !== undefined && <Icon name={icon} size={14} className="badge__icon" />}
      <p className="badge__text">{children}</p>
    </div>
  );
};
