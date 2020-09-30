/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

const Spotify = ({ url }) => {
  const { pathname } = new URL(url);
  return (
    <div 
      sx={{ 
        display: 'inline-block',
        width: '100%',
      }}
    >
      <iframe 
        allow="encrypted-media" 
        allowtransparency="true"
        frameBorder="0"
        src={`https://open.spotify.com/embed${pathname}`}
        sx={{
          border: 'none',
          borderRadius: 0,
          boxShadow: 0,
          maxWidth: '100%',
          width: '100%',
          height: '500px',
          backgroundColor: 'secondaryTrans'
        }}
        title="Spotify"
      />
    </div>
  );
};

export default Spotify;

Spotify.propTypes = {
  url: PropTypes.string.isRequired,
};