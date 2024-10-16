import 'react-nested-dropdown/dist/styles.css';

import clsx from 'clsx';
import React, { ReactElement } from 'react';
import {
  Dropdown as ReactNestedDropdown,
  type DropdownItem,
  DropdownProps,
} from 'react-nested-dropdown';

import { useCombinedPropsWithKit } from '~/hooks';

import styles from './styles.module.scss';

export const Dropdown = <TValue,>(props: DropdownProps<TValue>): ReactElement => {
  const { children, className, ...restProps } = useCombinedPropsWithKit({
    name: 'Dropdown',
    props,
  });
  return (
    <ReactNestedDropdown {...restProps} className={clsx(styles['container'], className)}>
      {children}
    </ReactNestedDropdown>
  );
};

export { DropdownItem };
