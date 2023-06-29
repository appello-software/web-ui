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
    <div
      className={clsx('appello-badge', `appello-badge--${color}`, {
        'appello-badge--filled': filled,
      })}
    >
      {icon !== undefined && <Icon name={icon} size={14} className="appello-badge__icon" />}
      <p className="appello-badge__text">{children}</p>
    </div>
  );
};
