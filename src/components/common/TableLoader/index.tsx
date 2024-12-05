import clsx from 'clsx';
import React, { FC, Fragment } from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

import { useCombinedPropsWithKit } from '~/hooks';

export interface TableLoaderProps {
  className?: string;
  rowsCount?: number;
  contentLoaderProps?: IContentLoaderProps;
}

export const TableLoader: FC<TableLoaderProps> = props => {
  const {
    className,
    rowsCount = 10,
    contentLoaderProps,
  } = useCombinedPropsWithKit({
    name: 'TableLoader',
    props,
  });

  return (
    <ContentLoader
      backgroundColor="hsl(var(--gray-7-color))"
      className={clsx('pointer-events-none', className)}
      foregroundColor="hsl(var(--gray-7-color) / 50%)"
      viewBox="0 0 1112 800"
      {...contentLoaderProps}
    >
      {Array.from({ length: rowsCount }).map((_, index) => {
        const y = index * 120;
        const y2 = y + 60;

        return (
          <Fragment key={index}>
            <rect height="20" rx="5" ry="5" width="27%" y={y} />
            <rect height="20" rx="5" width="112" x="408" y={y} />
            <rect height="20" rx="5" width="112" x="1000" y={y} />
            <rect height="20" rx="5" width="82" x="699" y={y} />

            <rect height="20" rx="5" width="243" y={y2} />
            <rect height="20" rx="5" width="82" x="408" y={y2} />
            <rect height="20" rx="5" width="149" x="963" y={y2} />
            <rect height="20" rx="5" width="112" x="699" y={y2} />
          </Fragment>
        );
      })}
    </ContentLoader>
  );
};
