import './styles.scss';

import clsx from 'clsx';
import React from 'react';
import Paginate from 'react-paginate';

import { Icon } from '~/components';

export interface PaginationProps {
  pageCount: number;
  offset: number;
  pageSize: number;
  totalCount: number;
  itemsCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  isFetching?: boolean;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  pageSize,
  pageCount,
  offset,
  onPageChange,
  totalCount,
  isFetching,
  itemsCount,
  className,
}) => {
  return (
    <div className={className}>
      <Paginate
        breakLabel="..."
        nextLabel={<Icon name="down-arrow" size={18} className="inline -rotate-90" />}
        onPageChange={onPageChange}
        pageRangeDisplayed={5}
        breakLinkClassName="pagination__link"
        breakClassName="pagination__item"
        pageCount={pageCount}
        forcePage={offset / pageSize}
        previousLabel={<Icon name="down-arrow" size={18} className="inline rotate-90" />}
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
