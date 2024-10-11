import './styles.scss';

import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

import { Icon } from '~/components/common/Icon';
import { useCombinedPropsWithKit } from '~/hooks';

export enum BadgeColor {
  GREEN = 'green',
  GRAY = 'gray',
  BLUE = 'blue',
  RED = 'red',
  ORANGE = 'orange',
  PINK = 'pink',
  YELLOW = 'yellow',
  GREEN_LIGHT = 'green-light',
  CYAN_DARK = 'cyan-dark',
  CYAN_LIGHT = 'cyan-light',
  PURPLE = 'purple',
}

export interface BadgeProps {
  children: ReactNode;
  color: BadgeColor;
  icon?: string;
  filled?: boolean;
}

export const Badge: FC<BadgeProps> = props => {
  const { children, color, icon, filled } = useCombinedPropsWithKit({
    name: 'Badge',
    props,
  });
  return (
    <div className={clsx('badge', `badge--${color}`, { 'badge--filled': filled })}>
      {icon !== undefined && <Icon className="badge__icon" name={icon} size={14} />}
      <p className="badge__text">{children}</p>
    </div>
  );
};
