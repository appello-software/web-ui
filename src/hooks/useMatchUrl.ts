import { useEffect, useState } from 'react';

export const useMatchUrl = (href?: string) => {
  if (typeof window === 'undefined') {
    throw Error('This hook only works on client side');
  }

  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    setIsMatch(checkIsMatch(href));
  }, [href]);

  const checkIsMatch = (href?: string) => {
    const currentUrl = window.location.pathname;

    const isHomePage = href === '/';
    const isExactMatch = currentUrl === href;
    const isNestedMatch = currentUrl.startsWith(href || '') && href !== '/';

    return (isExactMatch || isNestedMatch) && !isHomePage;
  };

  return {
    isMatch,
    checkIsMatch,
  };
};
