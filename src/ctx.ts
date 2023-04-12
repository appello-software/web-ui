import { createContext, useContext } from 'react';

import { AppelloKit, AppelloKitComponents } from './types';

const defaultTheme: AppelloKit = {
  pageSize: 10,
  debounceDelay: 500,
  dateFormat: 'dd/MM/yyyy',
};

const AppelloKitCtx = createContext<AppelloKit>(defaultTheme);
export const AppelloKitProvider = AppelloKitCtx.Provider;

export function useAppelloKit(): AppelloKit {
  return useContext(AppelloKitCtx);
}

const AppelloKitComponentsCtx = createContext<AppelloKitComponents>({});
export const AppelloKitComponentsProvider = AppelloKitComponentsCtx.Provider;

export function useAppelloKitComponents(): AppelloKitComponents {
  return useContext(AppelloKitComponentsCtx);
}
