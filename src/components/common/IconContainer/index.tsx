import './styles.scss';

import clsx from 'clsx';
import React, { FC } from 'react';

import { Icon } from '~/components/common/Icon';

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
