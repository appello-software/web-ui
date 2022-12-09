import { Icon } from '@ui/components/common/Icon';
import clsx from 'clsx';
import React, { FC } from 'react';

interface Props {
  name: string;
  className?: string;
}

export const IconContainer: FC<Props> = ({ name, className }) => {
  return (
    <div className={clsx(className, 'w-24 h-24 rounded-full bg-gray-7 flex-center text-accent')}>
      <Icon name={name} size="1.68rem" />
    </div>
  );
};
