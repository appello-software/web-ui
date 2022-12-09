import { IconContainer } from '@ui/components/common/IconContainer';
import React, { FC } from 'react';

interface Props {
  iconName: string;
  label: string;
}

export const EmptyState: FC<Props> = ({ iconName, label }) => {
  return (
    <div className="flex-center flex-col flex-1">
      <IconContainer name={iconName} />
      <p className="text-p4 text-gray-2 mt-4">{label}</p>
    </div>
  );
};
