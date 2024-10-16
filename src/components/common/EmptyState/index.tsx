import './styles.scss';

import clsx from 'clsx';
import React, { FC } from 'react';

import { IconContainer } from '~/components/common/IconContainer';
import { useCombinedPropsWithKit } from '~/hooks';

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

  /** Icon raw */
  isRawIcon?: boolean;
}

export const EmptyState: FC<EmptyStateProps> = props => {
  const { iconName, label, className, isRawIcon } = useCombinedPropsWithKit({
    name: 'EmptyState',
    props,
  });

  return (
    <div className={clsx('empty-state', className)}>
      <IconContainer isRawIcon={isRawIcon} name={iconName} />
      <p className="empty-state__label">{label}</p>
    </div>
  );
};
