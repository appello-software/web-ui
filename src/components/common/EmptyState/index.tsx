import './styles.scss';

import clsx from 'clsx';
import React, { FC } from 'react';

import { IconContainer } from '~/components/common/IconContainer';

export interface EmptyStateProps {
  /**
   * Icon name from spritemap
   */
  iconName: string;
  /**
   * Description text
   */
  label: string;
  /**
   * Additional class name
   */
  className?: string;
}

export const EmptyState: FC<EmptyStateProps> = ({ iconName, label, className }) => {
  return (
    <div className={clsx('empty-state', className)}>
      <IconContainer name={iconName} />
      <p className="empty-state__label">{label}</p>
    </div>
  );
};
