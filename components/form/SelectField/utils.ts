import { MultiValue, SingleValue } from 'react-select';

import { SelectOption } from '.';

export function isMultiOption<TValue>(
  option: MultiValue<SelectOption<TValue>> | SingleValue<SelectOption<TValue>>,
): option is MultiValue<SelectOption<TValue>> {
  return Array.isArray(option);
}
