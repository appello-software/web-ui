import './styles.scss';

import { isNil, useMountEffect, useUpdateEffect } from '@appello/common';
import clsx from 'clsx';
import React, {
  ReactElement,
  ReactNode,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

import { useCombinedPropsWithKit } from '~/hooks';

export interface Tab {
  title: ReactNode;
  element: ReactNode;
  rightComponent?: ReactNode;
  disabled?: boolean;
  path?: string;
}

export interface TabsRef {
  moveTo(index: number): void;
}

export interface TabsProps<TTab> {
  items: TTab[];
  contentClassName?: string;
  headListClassName?: string;
  className?: string;
  tabsRef?: React.RefObject<TabsRef>;
  selected?: number;
  onSelect?: (value: number) => void;
}

export const Tabs = <TTab extends Tab>(props: TabsProps<TTab>): ReactElement => {
  const { items, contentClassName, headListClassName, className, tabsRef, selected, onSelect } =
    useCombinedPropsWithKit({
      name: 'Tabs',
      props,
    });

  const location = useLocation();
  const navigate = useNavigate();

  const tabIndexByPath = useMemo(() => {
    const index = items.findIndex(item => item.path && matchPath(location.pathname, item.path));
    return index === -1 ? undefined : index;
  }, [items, location.pathname]);

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(selected ?? tabIndexByPath ?? 0);
  const element = items[selectedTabIndex]?.element;

  useMountEffect(() => {
    if (!isNil(tabIndexByPath) && !isNil(selected)) {
      setSelectedTabIndex(tabIndexByPath);
      onSelect?.(selectedTabIndex);
    }
  });

  useUpdateEffect(() => {
    setSelectedTabIndex(tabIndexByPath ?? 0);
  }, [tabIndexByPath]);

  useUpdateEffect(() => {
    setSelectedTabIndex(selected ?? 0);
  }, [selected]);

  useUpdateEffect(() => {
    onSelect?.(selectedTabIndex);
  }, [selectedTabIndex, onSelect]);

  useImperativeHandle(tabsRef, () => ({
    moveTo(index: number) {
      setSelectedTabIndex(index);
    },
  }));

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
        <ul className={clsx('tabs__head-list', headListClassName)} ref={headListRef}>
          {items.map((item, index) => (
            <li className="tabs__head-item" key={index}>
              <button
                className={clsx('tabs__head-button', {
                  'tabs__head-button--active': index === selectedTabIndex,
                  'tabs__head-button--with-right-component': item.rightComponent,
                })}
                disabled={item.disabled}
                type="button"
                onClick={() => {
                  setSelectedTabIndex(index);
                  if (!isNil(item.path)) {
                    navigate(item.path);
                  }
                }}
              >
                <span>{item.title}</span>
                {item.rightComponent}
              </button>
            </li>
          ))}
        </ul>
        <div className="tabs__head-line" ref={activeLineRef} />
      </div>
      <div className={clsx('tabs__body', contentClassName)}>{element}</div>
    </div>
  );
};
