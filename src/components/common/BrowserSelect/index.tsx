import './styles.scss';

import clsx from 'clsx';
import React, { ChangeEventHandler } from 'react';

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

export const BrowserSelect: React.FC<BrowserSelectProps> = ({
  children,
  options,
  onChange,
  value,
  className,
}) => {
  return (
    <div className={clsx('browser-select', className)}>
      {children}
      <select onChange={onChange} className="browser-select__select" value={value}>
        {options.map((item, index) => (
          <option value={item.value} key={index}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};
