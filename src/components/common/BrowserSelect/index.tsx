import './styles.scss';

import clsx from 'clsx';
import React, { ChangeEventHandler } from 'react';

import { useCombinedPropsWithKit } from '~/hooks';

export interface BrowserSelectProps {
  /**
   * Control label
   */
  children: React.ReactNode;
  /**
   * Select options
   */
  options: { label: string; value: string }[];
  /**
   * On change handler
   */
  onChange: ChangeEventHandler<HTMLSelectElement>;
  /**
   * Selected value
   */
  value: string;
  /**
   * Additional class name
   */
  className?: string;
}

export const BrowserSelect: React.FC<BrowserSelectProps> = props => {
  const { children, options, onChange, value, className } = useCombinedPropsWithKit({
    name: 'BrowserSelect',
    props,
  });
  return (
    <div className={clsx('browser-select', className)}>
      {children}
      <select className="browser-select__select" value={value} onChange={onChange}>
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};
