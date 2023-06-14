import clsx from 'clsx';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useCombinedPropsWithKit } from '~/hooks';

import styles from './styles.module.scss';

export interface TextLinkProps {
  to?: string | VoidFunction;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const TextLink: React.FC<TextLinkProps> = props => {
  const {
    to,
    children,
    className,
    external = false,
  } = useCombinedPropsWithKit({
    name: 'TextLink',
    props,
  });

  const combinedClassName = useMemo(() => {
    return clsx(className, styles['link']);
  }, [className]);

  if (to === undefined || to instanceof Function) {
    return (
      <span onClick={to} className={combinedClassName} onKeyUp={to} role="button" tabIndex={0}>
        {children}
      </span>
    );
  }

  if (external) {
    return (
      <a href={to} className={combinedClassName} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={combinedClassName}>
      {children}
    </Link>
  );
};
