import { useSwitchValue } from '@appello/common';
import clsx from 'clsx';
import React, { useLayoutEffect } from 'react';

import { Link } from '~/components';
import { Icon } from '~/components/common/Icon';
import { useLocation } from '~/hooks';

import { SidebarItem } from '../..';

interface Props {
  item: SidebarItem;
  className?: string;
  onNavigate?: (to: string) => void;
}

export const NavItem: React.FC<Props> = ({ item, className, onNavigate }) => {
  const location = useLocation();
  const {
    value: isSubItemsOpen,
    toggle: toggleSubItems,
    set: setSubItemsOpen,
  } = useSwitchValue(false);

  useLayoutEffect(() => {
    setSubItemsOpen(location.pathname.startsWith(item.link));
  }, [item.link, location.pathname, setSubItemsOpen]);

  return (
    <li className={className}>
      {item.items && (
        <>
          <button
            className={clsx('sidebar__item', { 'sidebar__item--expanded': isSubItemsOpen })}
            type="button"
            onClick={toggleSubItems}
          >
            <Icon className="sidebar__nav-icon" name={item.icon} />
            <span className="sidebar__item-title">{item.title}</span>
            {item?.navRightContent?.(item)}
            <Icon className="sidebar__chevron" name="down-arrow" />
          </button>
          <ul className="sidebar__submenu">
            {item.items.map((subItem, index) => (
              <li key={index}>
                <Link
                  end
                  className={({ isActive }) =>
                    clsx('sidebar__item', { 'sidebar__item--active': isActive })
                  }
                  to={subItem.link}
                  onNavigate={onNavigate}
                >
                  <span className="sidebar__item-title">{subItem.title}</span>
                  {subItem?.navRightContent?.(subItem)}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {!item.items && (
        <Link
          className={({ isActive }) => clsx('sidebar__item', { 'sidebar__item--active': isActive })}
          to={item.link}
          onNavigate={onNavigate}
        >
          <Icon className="sidebar__nav-icon" name={item.icon} />
          <span className="sidebar__item-title">{item.title}</span>
          {item?.navRightContent?.(item)}
        </Link>
      )}
    </li>
  );
};
