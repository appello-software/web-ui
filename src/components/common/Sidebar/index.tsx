import './styles.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { useCombinedPropsWithKit } from '~/hooks';

import { NavItem } from './components/NavItem';

export interface SidebarItem {
  title: string;
  icon: string;
  link: string;
  items?: Omit<SidebarItem, 'icon' | 'items'>[];
}

export interface SidebarProps {
  items: SidebarItem[];
  logo: string;
  user?: {
    photoPlaceholder?: string;
    photo?: string | null;
    fullName: string;
    email: string;
  };
  rightHeaderElement?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = props => {
  const { items, logo, user, rightHeaderElement } = useCombinedPropsWithKit({
    name: 'Sidebar',
    props,
  });

  return (
    <div className="appello-sidebar">
      <header className="appello-sidebar__header">
        <Link to="/">
          <img src={logo} alt="Logo" className="appello-sidebar__logo" />
        </Link>
        {rightHeaderElement}
      </header>
      <nav className="appello-sidebar__nav-container">
        <ul>
          {items.map(item => (
            <NavItem key={item.title} item={item} className="appello-sidebar__list-item" />
          ))}
        </ul>
      </nav>
      {user && (
        <footer className="appello-sidebar__footer">
          {Boolean(user.photo || user.photoPlaceholder) && (
            <img
              src={user.photo || user.photoPlaceholder}
              alt={user.fullName}
              className="appello-sidebar__user-photo"
            />
          )}
          <div>
            <p className="appello-sidebar__user-name">{user.fullName}</p>
            <p className="appello-sidebar__user-email">{user.email}</p>
          </div>
        </footer>
      )}
    </div>
  );
};
