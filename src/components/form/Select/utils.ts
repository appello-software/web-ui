import { isObject } from '@appello/common';
import { MultiValue, SingleValue } from 'react-select';

import { NewSelectOption } from './Select';

export function isMultiOption<TOption>(
  option: MultiValue<TOption> | SingleValue<TOption>,
): option is MultiValue<TOption> {
  return Array.isArray(option);
}

export function isNewSelectOption(arg: unknown): arg is NewSelectOption {
  return isObject(arg) && '__isNew__' in arg;
}
