import React, { useEffect } from 'react';

const useWindowResize = (handleResize) => {
  if (typeof handleResize !== 'function') 
    throw('useWindowResize: You need to provide a callback function.');

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
};

export default useWindowResize;
