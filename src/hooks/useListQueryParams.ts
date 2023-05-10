import { useUpdateEffect } from '@appello/common/lib/hooks';
import { isNil } from '@appello/common/lib/utils';
import { toString } from '@appello/common/lib/utils/string';
import { useMemo, useState } from 'react';
import { useQueryParam } from 'use-query-params';

import { useAppelloKit } from '~/ctx';

enum ListQueryType {
  PAGE = 'page',
  SEARCH = 'search',
  // todo: sorting and filters
}

export type SearchType = string;
export type OffsetType = number;

interface UseListQueryParamsReturn<TFilter> {
  offset: OffsetType;
  setOffset: (newValue: OffsetType) => void;
  searchValue: SearchType;
  setSearchValue: (newValue: SearchType) => void;
  filter: TFilter | null;
  setFilter: (newValue: TFilter | null) => void;
  filtersCount: number;
}

export const useListQueryParams = <TFilter>(): UseListQueryParamsReturn<TFilter> => {
  const { pageSize } = useAppelloKit();
  const [offset, setOffset] = useQueryParam<number>(ListQueryType.PAGE, {
    encode: offset => toString(Math.ceil(offset / pageSize) + 1),
    decode: page => (Number(page) - 1 || 0) * pageSize,
  });
  const [searchValue, setSearchValue] = useQueryParam<SearchType>(ListQueryType.SEARCH);
  const [filter, setFilter] = useState<TFilter | null>(null);

  const filtersCount = useMemo(() => {
    return Object.values(filter || {}).filter(value => !isNil(value)).length;
  }, [filter]);

  useUpdateEffect(() => {
    setOffset(0);
  }, [searchValue, filter]);

  return useMemo(
    () => ({
      offset,
      setOffset,
      searchValue,
      setSearchValue,
      filter,
      filtersCount,
      setFilter,
    }),
    [filter, filtersCount, offset, searchValue, setOffset, setSearchValue],
  );
};
