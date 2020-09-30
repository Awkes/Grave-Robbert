import React, { useEffect } from 'react';

/*
  Usage: useWindowResize(callback, dependencies);

  dependencies is optional and if used it's accessable
  as the first argument in the callback function.
*/

const useWindowResize = (callback, dependencies = null) => {
  if (typeof callback !== 'function') 
    throw('useWindowResize: You need to provide a callback function.');
  
  function handleResize() { callback(dependencies); }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
};

export default useWindowResize;
