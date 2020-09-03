/** @jsx jsx */
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

const Hero = ({ video, scrollToRef }) => {
  function scrollDown(e) {
    window?.scrollTo(0, scrollToRef?.current?.offsetTop);
    e.currentTarget.blur();
  }

  return (
    <div sx={{
      background: '#000',
      position: 'relative',
      height: 'calc(100vh + 1px)',
      width: '100%',
      overflow: 'hidden',
      borderBottom: 0,
      textAlign: 'center',
    }}>
      <iframe
        allowFullScreen
        frameBorder="0" 
        src={`https://www.youtube.com/embed/${video}?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&modestbranding=1&autohide=1&playlist=${video}`} 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '120vh',
          transform: 'translate(-50%, -50%)',
          // pointerEvents: 'none',
          '@media(min-aspect-ratio: 16/9)': { height: '76.25vw' },
          '@media(max-aspect-ratio: 16/9)': { width: '177.78vh' },
        }} 
        title="video"
      />
      <button
        onClick={scrollDown}
        sx={{ 
          position: 'absolute',
          bottom: 6,
          width: '100%',
          fontSize: 3,
          padding: 3,
          transform: 'translateX(-50%)',
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

export default Hero;

Hero.propTypes = {
  video: PropTypes.string.isRequired,
  scrollToRef: PropTypes.object.isRequired,
};
