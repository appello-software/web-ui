import './styles.scss';

import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import Paginate from 'react-paginate';

import { Icon } from '~/components/common/Icon';
import { useCombinedPropsWithKit } from '~/hooks';

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
   * Page size
   */
  pageSize: number;
  /**
   * Triggering when page changed
   * @param options
   */
  onPageChange?: (options: { limit: number; offset: number }) => unknown;
}

export const Pagination: React.FC<PaginationProps> = props => {
  const { offset, setOffset, totalCount, itemsCount, className, pageSize, onPageChange } =
    useCombinedPropsWithKit({
      name: 'Pagination',
      props,
    });

  const [isFetching, setFetching] = useState<boolean>(false);

  const handlePageClick = useCallback(
    async (event: { selected: number }) => {
      const newOffset = (event.selected * pageSize) % totalCount;
      setOffset(newOffset);

      if (!onPageChange) {
        return;
      }

      try {
        setFetching(true);
        await onPageChange({
          limit: pageSize,
          offset: newOffset,
        });
      } finally {
        setFetching(false);
      }
    },
    [onPageChange, pageSize, setOffset, totalCount],
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
