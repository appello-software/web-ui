import { useSwitchValue } from '@appello/common';
import {
  autoUpdate,
  safePolygon,
  shift,
  useFloating,
  useHover,
  useInteractions,
} from '@floating-ui/react';
import clsx from 'clsx';
import React, { useLayoutEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { Icon, IconName } from '~/components/common/Icon';

import { SidebarItem } from '../..';

interface Props {
  item: SidebarItem;
  className?: string;
}

export const NavItem: React.FC<Props> = ({ item, className }) => {
  const location = useLocation();

  const { value: isHover, set: setHover } = useSwitchValue(false);

  const {
    value: isSubItemsOpen,
    toggle: toggleSubItems,
    set: setSubItemsOpen,
  } = useSwitchValue(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isHover,
    onOpenChange: setHover,
    whileElementsMounted: autoUpdate,
    placement: 'right-start',
    strategy: 'fixed',
    middleware: [
      shift({
        crossAxis: true,
      }),
    ],
  });

  const hover = useHover(context, {
    handleClose: safePolygon({
      blockPointerEvents: true,
    }),
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  useLayoutEffect(() => {
    setSubItemsOpen(location.pathname.startsWith(item.link));
  }, [item.link, location.pathname, setSubItemsOpen]);

  const renderNestedItems = () =>
    item?.items?.map((subItem, index) => (
      <li key={index}>
        <NavLink
          end
          className={({ isActive }) => clsx('sidebar__item', { 'sidebar__item--active': isActive })}
          to={subItem.link}
        >
          <span className="sidebar__item-title">{subItem.title}</span>
          {subItem?.navRightContent?.(subItem)}
        </NavLink>
      </li>
    ));

  return (
    <li className={className}>
      {item.items && (
        <>
          <button
            className={clsx('sidebar__item', { 'sidebar__item--expanded': isSubItemsOpen })}
            ref={refs.setReference}
            {...getReferenceProps()}
            type="button"
            onClick={toggleSubItems}
          >
            <Icon className="sidebar__nav-icon" name={item.icon as IconName['icons']} />
            <span className="sidebar__item-title">{item.title}</span>
            {item?.navRightContent?.(item)}
            <Icon className="sidebar__chevron" name="downArrow" />
          </button>

          <ul className="sidebar__submenu">{renderNestedItems()}</ul>

          {/* Show only on <1400px */}
          {/* @TODO unify it */}
          {isHover && (
            <div
              className="sidebar__floating"
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <ul className="sidebar__floating-menu">{renderNestedItems()}</ul>
            </div>
          )}
        </>
      )}

      {!item.items && (
        <NavLink
          className={({ isActive }) => clsx('sidebar__item', { 'sidebar__item--active': isActive })}
          to={item.link}
        >
          <Icon className="sidebar__nav-icon" name={item.icon as IconName['icons']} />
          <span className="sidebar__item-title">{item.title}</span>
          {item?.navRightContent?.(item)}
        </NavLink>
      )}
    </li>
  );
};
