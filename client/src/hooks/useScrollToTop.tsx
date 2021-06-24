import { useLayoutEffect } from 'react';

export const useScrollToTop = () => {
  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, []);
};
