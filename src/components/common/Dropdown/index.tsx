import 'react-nested-dropdown/dist/styles.css';

import React, { ReactElement } from 'react';
import {
  Dropdown as ReactNestedDropdown,
  type DropdownItem,
  DropdownProps,
} from 'react-nested-dropdown';

import { useCombinedPropsWithKit } from '~/hooks';

import styles from './styles.module.scss';

export const Dropdown = <TValue,>(props: DropdownProps<TValue>): ReactElement => {
  const { children, ...restProps } = useCombinedPropsWithKit({
    name: 'Dropdown',
    props,
  });
  return (
    <ReactNestedDropdown {...restProps} className={styles['container']}>
      {children}
    </ReactNestedDropdown>
  );
};

export { DropdownItem };
