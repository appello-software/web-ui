import { TableProps } from '~/components';
import { ButtonProps } from '~/components/common/Button';
import { SearchInputProps } from '~/components/common/SearchInput';
import { PhotoFieldProps } from '~/components/form/PhotoField';
import { SelectProps } from '~/components/form/Select';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UIComponents {
  Select: SelectProps<any, any, any>;
  Button: ButtonProps;
  PhotoField: PhotoFieldProps<any, any>;
  SearchInput: SearchInputProps;
  Table: TableProps<any>;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface AppelloKit {
  pageSize: number;
  debounceDelay: number;
  dateFormat: string;
}

export type AppelloKitComponents = { [P in keyof UIComponents]?: Partial<UIComponents[P]> };
