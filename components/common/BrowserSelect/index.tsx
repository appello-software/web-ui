import React, { ChangeEventHandler } from 'react';

interface Props {
  children: React.ReactNode;
  options: { label: string; value: string }[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: string;
}

export const BrowserSelect: React.FC<Props> = ({ children, options, onChange, value }) => {
  return (
    <div className="relative">
      {children}
      <select onChange={onChange} className="absolute inset-0 opacity-0" value={value}>
        {options.map((item, index) => (
          <option value={item.value} key={index}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};
