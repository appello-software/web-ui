import './styles.scss';

import clsx from 'clsx';
import React, { FC } from 'react';

import { Icon } from '~/components/common/Icon';
import { useCombinedPropsWithKit } from '~/hooks';

export interface IconContainerProps {
  name: string;
  className?: string;
  iconClassName?: string;
}

export const IconContainer: FC<IconContainerProps> = props => {
  const { name, className, iconClassName } = useCombinedPropsWithKit({
    name: 'IconContainer',
    props,
  });

  return (
    <div className={clsx('appello-icon-container', className)}>
      <Icon name={name} className={clsx('appello-icon-container__icon', iconClassName)} />
    </div>
  );
};
