import { SortingState } from '@tanstack/react-table';

import { OrderDirectionChoice } from '~/services/gql/__generated__/globalTypes';
import { Sorting } from '~/types';

export function transformSortingState<TId extends string>(value: SortingState): Sorting<TId> {
  return value.map(state => {
    const field = state.id as TId;
    const direction = state.desc ? OrderDirectionChoice.DESC : OrderDirectionChoice.ASC;

    return { field, direction };
  });
}
