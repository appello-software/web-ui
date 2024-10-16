import './styles.scss';

import clsx from 'clsx';
import React, { FC } from 'react';

import { Icon } from '~/components/common/Icon';
import { useCombinedPropsWithKit } from '~/hooks';

export interface IconContainerProps {
  name: string;
  className?: string;
  iconClassName?: string;
  isRawIcon?: boolean;
}

export const IconContainer: FC<IconContainerProps> = props => {
  const { name, className, iconClassName, isRawIcon } = useCombinedPropsWithKit({
    name: 'IconContainer',
    props,
  });

  return (
    <div className={clsx('icon-container', className)}>
      <Icon className={clsx('icon-container__icon', iconClassName)} name={name} raw={isRawIcon} />
    </div>
  );
};
