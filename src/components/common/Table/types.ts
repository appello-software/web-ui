import { ColumnDef, OnChangeFn, SortingState } from '@tanstack/table-core';

import { PaginationProps } from '../Pagination';

export interface CommonTableProps<TData> {
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Table data
   */
  data: TData[];
  /**
   * Table columns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  /**
   * Sorting state
   */
  sorting?: SortingState;
  /**
   * Sorting state setter
   */
  setSorting?: OnChangeFn<SortingState>;
  /**
   * Pagination offset
   */
  offset?: number;
  /**
   * Pagination offset setter
   * @param offset
   */
  setOffset?: (offset: number) => void;
  /**
   * Total items count for pagination
   */
  totalCount?: number;
  /**
   * Items count per page
   */
  pageSize?: number;
  /**
   * Error message
   */
  error?: string;
  /**
   * Triggering when page changed
   */
  onPageChange?: PaginationProps['onPageChange'];
}
