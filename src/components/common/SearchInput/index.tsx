import './styles.scss';

import clsx from 'clsx';
import React, { ChangeEvent, FC } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { Icon } from '~/components/common/Icon';
import { TextInput } from '~/components/form/TextInput';
import { useAppelloKit } from '~/ctx';
import { useCombinedPropsWithKit } from '~/hooks';

export interface SearchInputProps {
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
  } = useCombinedPropsWithKit({ name: 'SearchInput', props });

  const handleChange = useDebouncedCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(target.value);
  }, debounceDelay);

  return (
    <div className={clsx('search-input', className)}>
      <TextInput
        onChange={handleChange}
        placeholder={placeholder}
        inputClassName="search-input__input"
        defaultValue={defaultValue}
      />
      <Icon name="magnifier" className="search-input__icon" />
    </div>
  );
};
