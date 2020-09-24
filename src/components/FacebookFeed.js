/** @jsx jsx */
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { jsx } from 'theme-ui';

import useWindowResize from '../hooks/useWindowResize';

const FacebookFeed = ({ url }) => {
  const containerRef = useRef(null);
  const [fbWidth, setFbWidth] = useState(300);

  useWindowResize(ref => {
    if (ref.current) {
      const width = ref.current.getBoundingClientRect().width;
      setFbWidth(width < 500 ? width : 500);
    }
  }, containerRef);

  return (
    <div 
      ref={containerRef}
      sx={{ 
        display: 'inline-block',
        width: '100%',
        maxWidth: '500px',
      }}
    >
      <iframe 
        allow="encrypted-media" 
        allowtransparency="true" 
        scrolling="no"
        src={
          'https://www.facebook.com/plugins/page.php?href='+encodeURIComponent(url)+
          '%2F&tabs=timeline&width='+fbWidth+'&height=500&small_header=true'+
          '&adapt_container_width=true&hide_cover=false&show_facepile=true&appId'
        } 
        sx={{
          border: 'none',
          borderRadius: 0,
          boxShadow: 0,
          maxWidth: '100%',
          width: `${fbWidth}px`,
          height: '500px',
          backgroundColor: 'secondaryTrans'
        }}
        title="Facebook"
      />
    </div>
  );
};

export default FacebookFeed;

FacebookFeed.propTypes = {
  url: PropTypes.string.isRequired,
};