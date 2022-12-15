import { useUpdateEffect } from '@appello/common/lib/hooks';
import { useMemo } from 'react';
import { useQueryParam } from 'use-query-params';

import { PAGE_SIZE } from '~/constants/pagination';

enum ListQueryType {
  PAGE = 'page',
  SEARCH = 'search',
  // todo: sorting and filters
}

export type SearchType = string;
export type OffsetType = number;

interface UseListQueryParamsReturn {
  offset: OffsetType;
  setOffset: (newValue: OffsetType) => void;
  searchValue: SearchType;
  setSearchValue: (newValue: SearchType) => void;
}

export const useListQueryParams = (): UseListQueryParamsReturn => {
  const [offset, setOffset] = useQueryParam<number>(ListQueryType.PAGE, {
    encode: offset => `${Math.ceil(offset / PAGE_SIZE) + 1}`,
    decode: page => (Number(page) - 1 || 0) * PAGE_SIZE,
  });
  const [searchValue, setSearchValue] = useQueryParam<SearchType>(ListQueryType.SEARCH);

  useUpdateEffect(() => {
    setOffset(0);
  }, [searchValue]);

  return useMemo(
    () => ({
      offset,
      setOffset,
      searchValue,
      setSearchValue,
    }),
    [offset, searchValue, setOffset, setSearchValue],
  );
};
