/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

const YouTubeVideo = ({ id }) => (
  <iframe 
    // width="560" 
    // height="315"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    frameBorder="0" 
    src={`https://www.youtube.com/embed/${id}`}
    sx={{ 
      width: '560px',
      height: '315px',
      maxWidth: '80%',
      maxHeight: '80%',
    }}
    title={`YouTubeVideo-${id}`}
  />
);

export default YouTubeVideo;

YouTubeVideo.propTypes = {
  id: PropTypes.string.isRequired
};