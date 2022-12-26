import './styles.scss';

import { Icon } from '@ui/components/common/Icon';
import clsx from 'clsx';
import React, { FC } from 'react';

interface Props {
  name: string;
  className?: string;
  iconClassName?: string;
}

export const IconContainer: FC<Props> = ({ name, className, iconClassName }) => {
  return (
    <div className={clsx('icon-container', className)}>
      <Icon name={name} className={clsx('icon-container__icon', iconClassName)} />
    </div>
  );
};
