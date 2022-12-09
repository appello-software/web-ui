import clsx from 'clsx';
import React, { FC, Fragment } from 'react';
import ContentLoader from 'react-content-loader';

interface Props {
  className?: string;
}

export const TableLoader: FC<Props> = ({ className }) => {
  return (
    <ContentLoader
      viewBox="0 0 1112 800"
      className={clsx('pointer-events-none', className)}
      backgroundColor="hsl(var(--gray-7-color))"
      foregroundColor="hsl(var(--gray-7-color) / 50%)"
    >
      {Array.from({ length: 10 }).map((_, index) => {
        const y = index * 120;
        const y2 = y + 60;

        return (
          <Fragment key={index}>
            <rect width="27%" y={y} height="20" rx="5" ry="5" />
            <rect x="408" y={y} width="112" height="20" rx="5" />
            <rect x="1000" y={y} width="112" height="20" rx="5" />
            <rect x="699" y={y} width="82" height="20" rx="5" />

            <rect width="243" y={y2} height="20" rx="5" />
            <rect x="408" y={y2} width="82" height="20" rx="5" />
            <rect x="963" y={y2} width="149" height="20" rx="5" />
            <rect x="699" y={y2} width="112" height="20" rx="5" />
          </Fragment>
        );
      })}
    </ContentLoader>
  );
};
