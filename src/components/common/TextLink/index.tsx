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
      <span className={combinedClassName} role="button" tabIndex={0} onClick={to} onKeyUp={to}>
        {children}
      </span>
    );
  }

  if (external) {
    return (
      <a className={combinedClassName} href={to} rel="noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  return (
    <Link className={combinedClassName} to={to}>
      {children}
    </Link>
  );
};
