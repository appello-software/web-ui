export const useLocation = () => {
  if (typeof window === 'undefined') {
    throw Error('This hook only works on client side');
  }

  return window.location;
};
