import './styles.scss';

import { useDebounceCallback } from '@appello/common';
import clsx from 'clsx';
import React, { ChangeEvent, FC } from 'react';

import { Icon } from '~/components/common/Icon';
import { TextInput } from '~/components/form/TextInput';
import { useAppelloKit } from '~/ctx';
import { useCombinedPropsWithKit } from '~/hooks';

export interface SearchInputProps extends Pick<React.AllHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Change handler
   * @param value
   */
  onChange: (value: string) => void;
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Placeholder
   */
  placeholder?: string;
  /**
   * Default value
   */
  defaultValue?: string;
  /**
   * Debounce delay
   */
  debounceDelay?: number;
}

export const SearchInput: FC<SearchInputProps> = props => {
  const kit = useAppelloKit();
  const {
    onChange,
    className,
    placeholder,
    defaultValue,
    debounceDelay = kit.debounceDelay,
    type,
  } = useCombinedPropsWithKit({ name: 'SearchInput', props });

  const { debounce: handleChange } = useDebounceCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      onChange(target.value);
    },
    {
      wait: debounceDelay,
    },
  );

  return (
    <div className={clsx('search-input', className)}>
      <TextInput
        defaultValue={defaultValue}
        inputClassName="search-input__input"
        placeholder={placeholder}
        type={type}
        onChange={handleChange}
      />
      <Icon className="search-input__icon" name="magnifier" />
    </div>
  );
};
