import './styles.scss';

import { IconContainer } from '@ui/components/common/IconContainer';
import clsx from 'clsx';
import React, { FC } from 'react';

interface Props {
  iconName: string;
  label: string;
  className?: string;
}

export const EmptyState: FC<Props> = ({ iconName, label, className }) => {
  return (
    <div className={clsx('empty-state', className)}>
      <IconContainer name={iconName} />
      <p className="empty-state__label">{label}</p>
    </div>
  );
};
