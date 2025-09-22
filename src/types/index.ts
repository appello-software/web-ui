import { ToasterProps } from 'react-hot-toast';
import { DropdownProps } from 'react-nested-dropdown';

import {
  BadgeProps,
  BrowserSelectProps,
  ButtonProps,
  CheckboxProps,
  ColorPickerFieldProps,
  DateInputProps,
  DatePickerPopupProps,
  DatePickerProps,
  DateProps,
  EmptyStateProps,
  FieldErrorMessageProps,
  FieldProps,
  FileUploadProps,
  IconContainerProps,
  IconProps,
  InlineFieldsProps,
  LoaderProps,
  ModalProps,
  PaginationProps,
  PasswordFieldProps,
  PhotoFieldProps,
  RadioGroupFieldProps,
  RadioInputProps,
  SearchInputProps,
  SelectFieldProps,
  SelectProps,
  SidebarProps,
  TableLoaderProps,
  TableProps,
  TabsProps,
  TextAreaFieldProps,
  TextAreaProps,
  TextFieldProps,
  TextInputProps,
  TextLinkProps,
  TimeFieldProps,
  TimePickerProps,
  TypographyProps,
} from '~/components';

export interface UIComponents {
  Badge: BadgeProps;
  BrowserSelect: BrowserSelectProps;
  Button: ButtonProps;
  DatePicker: DatePickerProps;
  DatePickerPopup: DatePickerPopupProps;
  Dropdown: DropdownProps<any>;
  EmptyState: EmptyStateProps;
  FileUpload: FileUploadProps<any>;
  Icon: IconProps;
  IconContainer: IconContainerProps;
  Loader: LoaderProps;
  Modal: ModalProps;
  Pagination: PaginationProps;
  SearchInput: SearchInputProps;
  Sidebar: SidebarProps;
  Table: TableProps<any>;
  TableLoader: TableLoaderProps;
  Tabs: TabsProps<any>;
  TextLink: TextLinkProps;
  TimePicker: TimePickerProps;
  Toaster: ToasterProps;
  Checkbox: CheckboxProps;
  ColorPickerField: ColorPickerFieldProps<any, any>;
  DateField: DateProps<any, any>;
  DateInput: DateInputProps;
  Field: FieldProps;
  FieldErrorMessage: FieldErrorMessageProps;
  InlineFields: InlineFieldsProps;
  PasswordField: PasswordFieldProps<any>;
  PhotoField: PhotoFieldProps<any, any>;
  RadioGroupField: RadioGroupFieldProps<any>;
  RadioInput: RadioInputProps;
  Select: SelectProps<any, any, any, any>;
  SelectField: SelectFieldProps<any, any, any, any, any, any>;
  TextArea: TextAreaProps;
  TextAreaField: TextAreaFieldProps<any, any>;
  TextField: TextFieldProps<any, any>;
  TextInput: TextInputProps;
  TimeField: TimeFieldProps<any, any>;
  Typography: TypographyProps;
}

export interface AppelloKit {
  pageSize: number;
  debounceDelay: number;
  dateFormat: string;
}

export type AppelloKitComponents = { [P in keyof UIComponents]?: Partial<UIComponents[P]> };
