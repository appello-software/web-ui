import './styles.scss';

import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

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
  CUSTOM = 'custom',
}

export interface BadgeProps {
  children: ReactNode;
  color: BadgeColor;
  icon?: IconName;
  filled?: boolean;
  badgeStyle?: React.CSSProperties; // for custom badge styles
  textStyle?: React.CSSProperties; // for custom text styles
}

export const Badge: FC<BadgeProps> = props => {
  const { children, color, icon, filled, badgeStyle, textStyle } = useCombinedPropsWithKit({
    name: 'Badge',
    props,
  });

  const isCustomStyle = color === BadgeColor.CUSTOM;

  return (
    <div
      className={clsx('badge', `badge--${color}`, { 'badge--filled': filled })}
      style={isCustomStyle ? badgeStyle : undefined}
    >
      {icon !== undefined && <Icon className="badge__icon" name={icon} size={14} />}
      <p className="badge__text" style={isCustomStyle ? textStyle : undefined}>
        {children}
      </p>
    </div>
  );
};
