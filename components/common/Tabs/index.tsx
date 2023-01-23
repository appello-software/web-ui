import './styles.scss';

import clsx from 'clsx';
import React, { ReactElement, ReactNode, useState } from 'react';

export interface Tab {
  title: ReactNode;
  element: ReactNode;
  disabled?: boolean;
}

interface Props<TTab> {
  items: TTab[];
}

export const Tabs = <TTab extends Tab>({ items }: Props<TTab>): ReactElement => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const element = items[selectedTabIndex].element;

  return (
    <div className="tabs">
      <ul className="tabs__head">
        <li className="tabs__head-item">
          {items.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedTabIndex(index)}
              disabled={item.disabled}
              className={clsx('tabs__head-button', {
                'tabs__head-button--active': index === selectedTabIndex,
              })}
            >
              {item.title}
            </button>
          ))}
        </li>
      </ul>
      <div className="tabs__body">{element}</div>
    </div>
  );
};
