import { deepmerge } from 'deepmerge-ts';
import { createContext, FC, useContext, useMemo } from 'react';
import React from 'react';

import { AppelloKit, AppelloKitComponents } from './types';

const defaultTheme: AppelloKit = {
  pageSize: 10,
  debounceDelay: 500,
  dateFormat: 'dd/MM/yyyy',
};

const AppelloKitCtx = createContext<AppelloKit>(defaultTheme);
export const AppelloKitProvider: FC<{ value: Partial<AppelloKit> }> = ({ value }) => {
  const mergedTheme = useMemo(() => deepmerge(value, defaultTheme), [value]);

  return <AppelloKitCtx.Provider value={mergedTheme} />;
};

export function useAppelloKit(): AppelloKit {
  return useContext(AppelloKitCtx);
}

const AppelloKitComponentsCtx = createContext<AppelloKitComponents>({});
export const AppelloKitComponentsProvider = AppelloKitComponentsCtx.Provider;

export function useAppelloKitComponents(): AppelloKitComponents {
  return useContext(AppelloKitComponentsCtx);
}
