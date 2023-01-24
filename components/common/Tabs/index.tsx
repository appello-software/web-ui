import './styles.scss';

import clsx from 'clsx';
import React, { ReactElement, ReactNode, useLayoutEffect, useRef, useState } from 'react';

export interface Tab {
  title: ReactNode;
  element: ReactNode;
  disabled?: boolean;
}

interface Props<TTab> {
  items: TTab[];
  contentClassName?: string;
}

export const Tabs = <TTab extends Tab>({ items, contentClassName }: Props<TTab>): ReactElement => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const element = items[selectedTabIndex].element;

  const headListRef = useRef<HTMLUListElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!headListRef.current || !activeLineRef.current) {
      return;
    }
    const headListItems = Array.from(headListRef.current.children) as HTMLLIElement[];
    const activeTabElement = headListItems[selectedTabIndex];
    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      activeLineRef.current.style.width = `${offsetWidth}px`;
      activeLineRef.current.style.transform = `translate3d(${offsetLeft}px, 0, 0)`;
    }
  }, [selectedTabIndex]);

  return (
    <div className="tabs">
      <div className="tabs__head">
        <ul ref={headListRef} className="tabs__head-list">
          {items.map((item, index) => (
            <li key={index} className="tabs__head-item">
              <button
                type="button"
                onClick={() => setSelectedTabIndex(index)}
                disabled={item.disabled}
                className={clsx('tabs__head-button', {
                  'tabs__head-button--active': index === selectedTabIndex,
                })}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
        <div ref={activeLineRef} className="tabs__head-line" />
      </div>
      <div className={clsx('tabs__body', contentClassName)}>{element}</div>
    </div>
  );
};
