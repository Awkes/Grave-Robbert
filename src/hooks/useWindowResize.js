import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

const useWindowResize = (handleResize) => {
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
};

export default useWindowResize;

useWindowResize.propTypes = {
  handleResize: PropTypes.func.isRequired,
};