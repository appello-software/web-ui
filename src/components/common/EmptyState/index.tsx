import './styles.scss';

import clsx from 'clsx';
import React, { FC } from 'react';

import { IconContainer } from '~/components/common/IconContainer';

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
