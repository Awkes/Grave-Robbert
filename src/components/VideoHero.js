/** @jsx jsx */
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

const VideoHero = ({ video, scrollToRef }) => {
  function scrollDown(e) {
    window?.scrollTo(0, scrollToRef?.current?.offsetTop);
    e.currentTarget.blur();
  }
  
  return (
    <div id="video" sx={{
      background: '#000',
      borderBottom: '1px solid',
      borderColor: 'text',
      height: 'calc(100vh + 1px)',
      overflow: 'hidden',
      position: 'relative',
      top: 0,
    }}>
      <video
        autoPlay
        loop
        muted
        sx={{
          minWidth: '100%',
          minHeight: '100%',
          maxWidth: '100%',
          objectFit: 'cover'
        }}
      >
        <source src={video} />
      </video> 
      <button
        onClick={scrollDown}
        sx={{ 
          position: 'absolute',
          bottom: 0,
          width: '100%',
          fontSize: 3,
          padding: 7,
          display: 'block',
          textAlign: 'center', 
          color: 'text', 
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
    </div>  
  );
};

export default VideoHero;

VideoHero.propTypes = {
  video: PropTypes.string.isRequired,
  scrollToRef: PropTypes.object.isRequired,
};
