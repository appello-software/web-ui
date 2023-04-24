import './styles.scss';

import { FetchMoreQueryOptions } from '@apollo/client/core/watchQueryOptions';
import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import Paginate from 'react-paginate';

import { Icon } from '~/components/common/Icon';
import { useAppelloKit } from '~/ctx';

export interface PaginationProps {
  /**
   * Current offset
   */
  offset: number;
  /**
   * Offset setter
   * @param offset
   */
  setOffset: (offset: number) => void;
  /**
   * Total items count
   */
  totalCount: number;
  /**
   * Items count per page
   */
  itemsCount: number;
  /**
   * Additional class name
   */
  className?: string;

  /**
   * Fetch more function (GraphQL only)
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  fetchMore: (
    options: FetchMoreQueryOptions<any> & {
      updateQuery?: (
        previousQueryResult: any,
        options: {
          fetchMoreResult: any;
          variables: any;
        },
      ) => any;
    },
  ) => Promise<unknown>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export const Pagination: React.FC<PaginationProps> = ({
  offset,
  setOffset,
  totalCount,
  itemsCount,
  className,
  fetchMore,
}) => {
  const [isFetching, setFetching] = useState<boolean>(false);
  const { pageSize } = useAppelloKit();

  const handlePageClick = useCallback(
    async (event: { selected: number }) => {
      const newOffset = (event.selected * pageSize) % totalCount;
      setOffset(newOffset);

      try {
        setFetching(true);
        await fetchMore({
          variables: {
            pagination: {
              limit: pageSize,
              offset: newOffset,
            },
          },
          updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
        });
      } finally {
        setFetching(false);
      }
    },
    [fetchMore, pageSize, setOffset, totalCount],
  );

  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <div className={className}>
      <Paginate
        breakLabel="..."
        nextLabel={<Icon name="down-arrow" size={18} className="pagination__nav-icon--next" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        breakLinkClassName="pagination__link"
        breakClassName="pagination__item"
        pageCount={pageCount}
        forcePage={offset / pageSize}
        previousLabel={<Icon name="down-arrow" size={18} className="pagination__nav-icon--prev" />}
        containerClassName="pagination"
        marginPagesDisplayed={5}
        pageLinkClassName="pagination__link"
        pageClassName="pagination__item"
        disabledClassName="pagination__item--disabled"
        activeClassName="pagination__item--active"
        previousLinkClassName={clsx('pagination__link', 'pagination__link--nav')}
        previousClassName="pagination__item"
        nextLinkClassName={clsx('pagination__link', 'pagination__link--nav')}
        nextClassName="pagination__item"
      />
      <p className="pagination__caption">
        Results: {offset + 1} - {!isFetching ? offset + itemsCount : '...'} of {totalCount}
      </p>
    </div>
  );
};