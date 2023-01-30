import { Icon } from '@ui/components/common/Icon';
import { TextInput } from '@ui/components/form/TextInput';
import clsx from 'clsx';
import React, { ChangeEvent, FC } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { DEBOUNCE_DELAY } from '~/constants/timing';

import styles from './styles.module.scss';

interface Props {
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
}

export const SearchInput: FC<Props> = ({ onChange, className, placeholder, defaultValue }) => {
  const handleChange = useDebouncedCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(target.value);
  }, DEBOUNCE_DELAY);

  return (
    <div className={clsx('relative', className)}>
      <Icon name="magnifier" className={styles['icon']} />
      <TextInput
        onChange={handleChange}
        placeholder={placeholder}
        inputClassName={styles['input']}
        defaultValue={defaultValue}
      />
    </div>
  );
};
