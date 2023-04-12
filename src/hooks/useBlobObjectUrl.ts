import { isString } from '@appello/common/lib/utils/string';
import { useMemo } from 'react';

export function useBlobObjectUrl(blob: Blob | File): string;
export function useBlobObjectUrl(blob: Blob | File | string | null): string | null;

export function useBlobObjectUrl(blob: Blob | File | string | null): string | null {
  return useMemo(() => {
    if (isString(blob)) {
      return blob;
    }

    if (blob instanceof Blob) {
      return URL.createObjectURL(blob);
    }

    return null;
  }, [blob]);
}
