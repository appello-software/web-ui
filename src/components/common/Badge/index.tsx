import './styles.scss';

import clsx from 'clsx';
import React, { FC, HTMLAttributes, ReactNode } from 'react';

import { Icon, IconName } from '~/components/common/Icon';
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

type AllowedDivProps = Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'style'>;

export interface BadgeProps extends AllowedDivProps {
  children: ReactNode;
  color: BadgeColor;
  icon?: IconName;
  filled?: boolean;
}

export const Badge: FC<BadgeProps> = props => {
  const { children, color, icon, filled, className, style } = useCombinedPropsWithKit({
    name: 'Badge',
    props,
  });

  return (
    <div className={clsx('badge', `badge--${color}`, { 'badge--filled': filled }, className)}>
      {icon !== undefined && <Icon className="badge__icon" name={icon} size={14} />}
      <p className="badge__text" style={style}>
        {children}
      </p>
    </div>
  );
};
