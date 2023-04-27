import { deepmerge } from 'deepmerge-ts';
import { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import React from 'react';

import { AppelloKit, AppelloKitComponents } from './types';

const defaultTheme: AppelloKit = {
  pageSize: 10,
  debounceDelay: 500,
  dateFormat: 'dd/MM/yyyy',
};

const AppelloKitCtx = createContext<AppelloKit>(defaultTheme);

interface AppelloKitProviderProps {
  value: Partial<AppelloKit>;
  children: ReactNode;
}

export const AppelloKitProvider: FC<AppelloKitProviderProps> = ({ value, children }) => {
  const mergedTheme = useMemo(() => deepmerge(defaultTheme, value) as AppelloKit, [value]);

  return <AppelloKitCtx.Provider value={mergedTheme}>{children}</AppelloKitCtx.Provider>;
};

export function useAppelloKit(): AppelloKit {
  return useContext(AppelloKitCtx);
}

const AppelloKitComponentsCtx = createContext<AppelloKitComponents>({});
export const AppelloKitComponentsProvider = AppelloKitComponentsCtx.Provider;

export function useAppelloKitComponents(): AppelloKitComponents {
  return useContext(AppelloKitComponentsCtx);
}
