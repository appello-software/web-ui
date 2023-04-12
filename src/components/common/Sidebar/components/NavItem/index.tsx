import { useSwitchValue } from '@appello/common/lib/hooks';
import clsx from 'clsx';
import React, { useLayoutEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { Icon } from '~/components/common/Icon';

import { SidebarItem } from '../..';

interface Props {
  item: SidebarItem;
  className?: string;
}

export const NavItem: React.FC<Props> = ({ item, className }) => {
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
            type="button"
            className={clsx('sidebar__item', { 'sidebar__item--expanded': isSubItemsOpen })}
            onClick={toggleSubItems}
          >
            <Icon name={item.icon} className="sidebar__nav-icon" />
            <span className="sidebar__item-title">{item.title}</span>
            <Icon name="down-arrow" className="sidebar__chevron" />
          </button>
          <ul className="sidebar__submenu">
            {item.items.map((subItem, index) => (
              <li key={index}>
                <NavLink
                  to={subItem.link}
                  className={({ isActive }) =>
                    clsx('sidebar__item', { 'sidebar__item--active': isActive })
                  }
                  end
                >
                  <span className="sidebar__item-title">{subItem.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </>
      )}
      {!item.items && (
        <NavLink
          to={item.link}
          className={({ isActive }) => clsx('sidebar__item', { 'sidebar__item--active': isActive })}
        >
          <Icon name={item.icon} className="sidebar__nav-icon" />
          <span className="sidebar__item-title">{item.title}</span>
        </NavLink>
      )}
    </li>
  );
};
