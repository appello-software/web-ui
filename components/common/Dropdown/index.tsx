import 'react-nested-dropdown/dist/styles.css';

import React, { ReactElement } from 'react';
import {
  type DropdownItem,
  Dropdown as ReactNestedDropdown,
  DropdownProps,
} from 'react-nested-dropdown';

import styles from './styles.module.scss';

export const Dropdown = <TValue,>({ children, ...props }: DropdownProps<TValue>): ReactElement => {
  return (
    <ReactNestedDropdown {...props} className={styles['container']}>
      {children}
    </ReactNestedDropdown>
  );
};

export { DropdownItem };
