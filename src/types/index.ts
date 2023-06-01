import { ToasterProps } from 'react-hot-toast';
import { DropdownProps } from 'react-nested-dropdown';

import { BadgeProps } from '~/components/common/Badge';
import { BrowserSelectProps } from '~/components/common/BrowserSelect';
import { ButtonProps } from '~/components/common/Button';
import { DatePickerProps } from '~/components/common/DatePicker';
import { DatePickerPopupProps } from '~/components/common/DatePickerPopup';
import { EmptyStateProps } from '~/components/common/EmptyState';
import { FileUploadProps } from '~/components/common/FileUpload';
import { IconProps } from '~/components/common/Icon';
import { IconContainerProps } from '~/components/common/IconContainer';
import { LoaderProps } from '~/components/common/Loader';
import { ModalProps } from '~/components/common/Modal';
import { PaginationProps } from '~/components/common/Pagination';
import { SearchInputProps } from '~/components/common/SearchInput';
import { SidebarProps } from '~/components/common/Sidebar';
import { TableProps } from '~/components/common/Table';
import { TableLoaderProps } from '~/components/common/TableLoader';
import { TabsProps } from '~/components/common/Tabs';
import { TextLinkProps } from '~/components/common/TextLink';
import { TimePickerProps } from '~/components/common/TimePicker';
import { CheckboxProps } from '~/components/form/Checkbox';
import { ColorPickerFieldProps } from '~/components/form/ColorPickerField';
import { DateProps } from '~/components/form/DateField';
import { DateInputProps } from '~/components/form/DateInput';
import { FieldProps } from '~/components/form/Field';
import { FieldErrorMessageProps } from '~/components/form/FieldErrorMessage';
import { InlineFieldsProps } from '~/components/form/InlineFields';
import { PasswordFieldProps } from '~/components/form/PasswordField';
import { PhotoFieldProps } from '~/components/form/PhotoField';
import { RadioGroupFieldProps } from '~/components/form/RadioGroupField';
import { RadioInputProps } from '~/components/form/RadioInput';
import { SelectProps } from '~/components/form/Select';
import { SelectFieldProps } from '~/components/form/SelectField';
import { TextAreaProps } from '~/components/form/TextArea';
import { TextAreaFieldProps } from '~/components/form/TextAreaField';
import { TextFieldProps } from '~/components/form/TextField';
import { TextInputProps } from '~/components/form/TextInput';

/* eslint-disable @typescript-eslint/no-explicit-any */
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
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface AppelloKit {
  pageSize: number;
  debounceDelay: number;
  dateFormat: string;
}

export type AppelloKitComponents = { [P in keyof UIComponents]?: Partial<UIComponents[P]> };
