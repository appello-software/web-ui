import { MultiValue, SingleValue } from 'react-select';

export function isMultiOption<TOption>(
  option: MultiValue<TOption> | SingleValue<TOption>,
): option is MultiValue<TOption> {
  return Array.isArray(option);
}
