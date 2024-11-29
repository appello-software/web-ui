import './styles.scss';

import clsx from 'clsx';
import React, { FC } from 'react';

import { Icon, IconName } from '~/components/common/Icon';
import { useCombinedPropsWithKit } from '~/hooks';

export interface IconContainerProps {
  name: IconName;
  className?: string;
  iconClassName?: string;
  isRawIcon?: boolean;
}

export const IconContainer: FC<IconContainerProps> = props => {
  const { name, className, iconClassName } = useCombinedPropsWithKit({
    name: 'IconContainer',
    props,
  });

  return (
    <div className={clsx('icon-container', className)}>
      <Icon className={clsx('icon-container__icon', iconClassName)} name={name} />
    </div>
  );
};
