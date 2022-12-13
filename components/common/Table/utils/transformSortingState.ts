import { SortingState } from '@tanstack/react-table';

import { Sorting } from '~/types';

export function transformSortingState<TId extends string>(value: SortingState): Sorting<TId> {
  return value.map(state => {
    const field = state.id as TId;
    const direction = state.desc ? 'desc' : 'asc';

    return { field, direction };
  });
}
