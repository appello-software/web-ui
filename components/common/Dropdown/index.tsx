import 'react-nested-dropdown/dist/styles.css';

import React, { ReactElement } from 'react';
import {
  Dropdown as ReactNestedDropdown,
  type DropdownItem,
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
