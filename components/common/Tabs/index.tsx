import './styles.scss';

import { useUpdateEffect } from '@appello/common/lib/hooks';
import clsx from 'clsx';
import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

export interface Tab {
  title: ReactNode;
  element: ReactNode;
  disabled?: boolean;
}

export interface TabsRef {
  moveTo(index: number): void;
  getSelectedTabIndex(): number;
}

interface Props<TTab> {
  items: TTab[];
  contentClassName?: string;
  className?: string;
  tabsRef?: React.RefObject<TabsRef>;
  selected?: number;
  onSelect?: (value: number) => void;
}

export const Tabs = <TTab extends Tab>({
  items,
  contentClassName,
  className,
  tabsRef,
  selected,
  onSelect,
}: Props<TTab>): ReactElement => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(selected ?? 0);
  const element = items[selectedTabIndex]?.element;

  useEffect(() => {
    setSelectedTabIndex(selected ?? 0);
  }, [selected]);

  useUpdateEffect(() => {
    onSelect?.(selectedTabIndex);
  }, [selectedTabIndex, onSelect]);

  useImperativeHandle(
    tabsRef,
    () => ({
      moveTo(index: number) {
        setSelectedTabIndex(index);
      },
      getSelectedTabIndex() {
        return selectedTabIndex;
      },
    }),
    [selectedTabIndex],
  );

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
  }, [selectedTabIndex, element]);

  return (
    <div className={clsx('tabs', className)}>
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
