import './styles.scss';

import { useMountEffect, useUpdateEffect } from '@appello/common/lib/hooks';
import { isNil } from '@appello/common/lib/utils/isNil';
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
    <div className={clsx('appello-tabs', className)}>
      <div className="appello-tabs__head">
        <ul ref={headListRef} className={clsx('appello-tabs__head-list', headListClassName)}>
          {items.map((item, index) => (
            <li key={index} className="appello-tabs__head-item">
              <button
                type="button"
                onClick={() => {
                  setSelectedTabIndex(index);
                  if (!isNil(item.path)) {
                    navigate(item.path);
                  }
                }}
                disabled={item.disabled}
                className={clsx('appello-tabs__head-button', {
                  'appello-tabs__head-button--active': index === selectedTabIndex,
                })}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
        <div ref={activeLineRef} className="appello-tabs__head-line" />
      </div>
      <div className={clsx('appello-tabs__body', contentClassName)}>{element}</div>
    </div>
  );
};
