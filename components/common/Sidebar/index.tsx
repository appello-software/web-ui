import './styles.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';

import { NavItem } from './components/NavItem';

export interface SidebarItem {
  title: string;
  icon: string;
  link: string;
  items?: Omit<SidebarItem, 'icon' | 'items'>[];
}

interface Props {
  items: SidebarItem[];
  logo: string;
  user?: {
    photo?: Nullable<string>;
    fullName: string;
    email: string;
  };
}

export const Sidebar: React.FC<Props> = ({ items, logo, user }) => {
  return (
    <div className="sidebar">
      <header className="sidebar__header">
        <Link to={ROUTES.HOME}>
          <img src={logo} alt="Logo" className="sidebar__logo" />
        </Link>
      </header>
      <nav className="sidebar__nav-container">
        <ul>
          {items.map(item => (
            <NavItem key={item.title} item={item} className="sidebar__list-item" />
          ))}
        </ul>
      </nav>
      {user && (
        <footer className="sidebar__footer">
          {user.photo && (
            <img src={user.photo} alt={user.fullName} className="sidebar__user-photo" />
          )}
          <div>
            <p className="sidebar__user-name">{user.fullName}</p>
            <p className="sidebar__user-email">{user.email}</p>
          </div>
        </footer>
      )}
    </div>
  );
};
