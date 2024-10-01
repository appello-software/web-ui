import './styles.scss';

import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { useCombinedPropsWithKit } from '~/hooks';

import { NavItem } from './components/NavItem';

export interface SidebarItem {
  title: string;
  icon: string;
  link: string;
  items?: (Omit<SidebarItem, 'icon' | 'items'> & {
    navRightContent?: (item: Omit<SidebarItem, 'icon' | 'items'>) => ReactElement;
  })[];
  navRightContent?: (item: SidebarItem) => ReactElement;
}

export interface SidebarProps {
  items: SidebarItem[];
  logo: string;
  smallLogo?: string;
  user?: {
    photoPlaceholder?: string;
    photo?: string | null;
    fullName: string;
    email: string;
  };
  onClickUserProfile?: () => void;
  isCollapsed?: boolean;
  rightHeaderElement?: React.ReactNode;
  userInfoRightElement?: React.ReactNode;
  footerTopElement?: React.ReactNode;
  footerBottomElement?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = props => {
  const {
    items,
    logo,
    smallLogo,
    user,
    rightHeaderElement,
    userInfoRightElement,
    footerTopElement,
    footerBottomElement,
    isCollapsed,
    onClickUserProfile,
  } = useCombinedPropsWithKit({
    name: 'Sidebar',
    props,
  });
  const SidebarFooterUserInfoComponent = onClickUserProfile ? 'button' : 'div';

  return (
    <div className={clsx('sidebar', isCollapsed && 'sidebar--collapsed')}>
      <header className="sidebar__header">
        <Link className="sidebar__logo-link" to="/">
          <img alt="logo" className="sidebar__logo" src={logo} />
        </Link>
        {smallLogo && (
          <Link className="sidebar__logo-link--collapsed" to="/">
            <img alt="minimized logo" className="sidebar__logo" src={smallLogo} />
          </Link>
        )}
        {rightHeaderElement}
      </header>
      <nav className="sidebar__nav-container">
        <ul>
          {items.map(item => (
            <NavItem className="sidebar__list-item" item={item} key={item.title} />
          ))}
        </ul>
      </nav>
      {user && (
        <footer className="sidebar__footer">
          {!!footerTopElement && footerTopElement}

          <div className="sidebar__footer-user-wrapper">
            <SidebarFooterUserInfoComponent
              className="sidebar__footer-user-info"
              onClick={onClickUserProfile}
            >
              {Boolean(user.photo || user.photoPlaceholder) && (
                <img
                  alt={user.fullName}
                  className="sidebar__user-photo"
                  src={user.photo || user.photoPlaceholder}
                />
              )}
              <div>
                <p className="sidebar__user-name">{user.fullName}</p>
                <p className="sidebar__user-email">{user.email}</p>
              </div>
            </SidebarFooterUserInfoComponent>

            {userInfoRightElement && (
              <div className="sidebar__footer-user-right-element">{userInfoRightElement}</div>
            )}
          </div>

          {!!footerBottomElement && footerBottomElement}
        </footer>
      )}
    </div>
  );
};
