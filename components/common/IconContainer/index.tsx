import './styles.scss';

import { Icon } from '@ui/components/common/Icon';
import clsx from 'clsx';
import React, { FC } from 'react';

interface Props {
  name: string;
  className?: string;
}

export const IconContainer: FC<Props> = ({ name, className }) => {
  return (
    <div className={clsx('icon-container', className)}>
      <Icon name={name} className="icon-container__icon" />
    </div>
  );
};
