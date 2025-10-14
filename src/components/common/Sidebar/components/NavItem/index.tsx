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
import React, { memo, ReactElement, useCallback, useLayoutEffect } from 'react';

import { Icon, Link } from '~/components';
import { useLocation } from '~/hooks';

import { SidebarItem } from '../..';

interface Props {
  item: SidebarItem;
  className?: string;
  onNavigate?: (to: string) => void;
  isActiveMenu?: (to: string) => void;
  isCollapsed?: boolean;
  renderLink?: (props: {
    children: React.ReactNode;
    className: string;
    to: string;
  }) => ReactElement;
}

export const NavItem: React.FC<Props> = memo(
  ({ item, className, onNavigate, isCollapsed, isActiveMenu, renderLink }) => {
    const location = useLocation();

    const renderNavItem = useCallback(
      (props: Parameters<NonNullable<Props['renderLink']>>[0]) => {
        if (renderLink) {
          return renderLink(props);
        }
        return (
          <Link
            end
            className={({ isActive }) =>
              clsx('sidebar__item', {
                'sidebar__item--active': isActive || isActiveMenu?.(props.to),
              })
            }
            to={props.to}
            onNavigate={onNavigate}
          >
            {props.children}
          </Link>
        );
      },
      [isActiveMenu, onNavigate, renderLink],
    );

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
          {renderNavItem({
            to: subItem.link,
            className: 'sidebar__item',
            children: (
              <>
                <span className="sidebar__item-title">{subItem.title}</span>
                {subItem?.navRightContent?.(subItem)}
              </>
            ),
          })}
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
              <Icon className="sidebar__nav-icon" name={item.icon} />
              <span className="sidebar__item-title">{item.title}</span>
              {item?.navRightContent?.(item)}
              <Icon className="sidebar__chevron" name="downArrow" />
            </button>

            <ul className="sidebar__submenu">{renderNestedItems()}</ul>

            {/* Show only on <1400px */}
            {/* @TODO unify it */}
            {isHover && isCollapsed && (
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
          <>
            {renderNavItem({
              to: item.link,
              className: 'sidebar__item',
              children: (
                <>
                  <Icon className="sidebar__nav-icon" name={item.icon} />
                  <span className="sidebar__item-title">{item.title}</span>
                  {item?.navRightContent?.(item)}
                </>
              ),
            })}
          </>
        )}
      </li>
    );
  },
);
