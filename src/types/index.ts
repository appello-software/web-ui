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
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface AppelloKit {
  pageSize: number;
  debounceDelay: number;
  dateFormat: string;
}

export type AppelloKitComponents = { [P in keyof UIComponents]?: Partial<UIComponents[P]> };
// import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
// import { PAGE_SIZE } from '~/constants/pagination';
// import { DEBOUNCE_DELAY } from '~/constants/timing';
// import { DATE_FORMAT } from '~/constants/dates';
// <link rel="stylesheet" href="node_modules/@atlaskit/css-reset/dist/bundle.css" />

export interface UseCombinedPropsWithKitProps<
  TName extends keyof UIComponents,
  TProps extends UIComponents[TName],
> {
  name: TName;
  props: TProps;
}
