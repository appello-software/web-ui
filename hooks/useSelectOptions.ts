import { getByPath, Path, PathValue } from 'dot-path-value';
import { useMemo } from 'react';

export function useSelectOptions<
  T extends object,
  TKeys extends { label: Path<T>; value: Path<T> },
>(
  data: T[] | undefined,
  keys: TKeys,
): { label: PathValue<T, TKeys['label']>; value: PathValue<T, TKeys['value']> }[] {
  const labelKey = useMemo(() => keys.label, [keys.label]);
  const valueKey = useMemo(() => keys.value, [keys.value]);

  return useMemo(
    () =>
      data?.map(item => ({
        value: getByPath(item, valueKey),
        label: getByPath(item, labelKey),
      })) ?? [],
    [data, valueKey, labelKey],
  );
}
