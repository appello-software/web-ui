import './styles.scss';

import { IconContainer } from '@ui/components/common/IconContainer';
import React, { FC } from 'react';

interface Props {
  iconName: string;
  label: string;
}

export const EmptyState: FC<Props> = ({ iconName, label }) => {
  return (
    <div className="empty-state">
      <IconContainer name={iconName} />
      <p className="empty-state__label">{label}</p>
    </div>
  );
};
