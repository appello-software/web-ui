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
        nextLabel={
          <Icon name="down-arrow" size={18} className="appello-pagination__nav-icon--next" />
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        breakLinkClassName="appello-pagination__link"
        breakClassName="appello-pagination__item"
        pageCount={pageCount}
        forcePage={offset / pageSize}
        previousLabel={
          <Icon name="down-arrow" size={18} className="appello-pagination__nav-icon--prev" />
        }
        containerClassName="appello-pagination"
        marginPagesDisplayed={5}
        pageLinkClassName="appello-pagination__link"
        pageClassName="appello-pagination__item"
        disabledClassName="appello-pagination__item--disabled"
        activeClassName="appello-pagination__item--active"
        previousLinkClassName={clsx('appello-pagination__link', 'appello-pagination__link--nav')}
        previousClassName="appello-pagination__item"
        nextLinkClassName={clsx('appello-pagination__link', 'appello-pagination__link--nav')}
        nextClassName="appello-pagination__item"
      />
      <p className="appello-pagination__caption">
        Results: {offset + 1} - {!isFetching ? offset + itemsCount : '...'} of {totalCount}
      </p>
    </div>
  );
};
