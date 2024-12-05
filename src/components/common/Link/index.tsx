import React from 'react';

import { useCombinedPropsWithKit, useMatchUrl, usePathname } from '~/hooks';

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'> {
  to: string;
  end?: boolean;
  onNavigate?: (to: string) => void;
  className: ((params: { isActive: boolean }) => string) | string;
}

export const Link: React.FC<LinkProps> = props => {
  const pathname = usePathname();

  const {
    to,
    children,
    className,
    end = false,
    onNavigate,
    ...linkProps
  } = useCombinedPropsWithKit({
    name: 'Link',
    props,
  });

  const { isMatch } = useMatchUrl(to);

  const isActive = end ? isMatch : to === pathname;

  const computedClassName = typeof className === 'function' ? className({ isActive }) : className;

  const onClick = () => {
    onNavigate?.(to);
  };

  return (
    <a aria-hidden="true" className={computedClassName} onClick={onClick} {...linkProps}>
      {children}
    </a>
  );
};
