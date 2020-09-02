/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
      overflow: 'hidden',
      borderBottom: 0,
      textAlign: 'center',
    }}>
      <iframe
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '100vh',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          '@media(min-aspect-ratio: 16/9)': { height: '56.25vw' },
          '@media(max-aspect-ratio: 16/9)': { width: '177.78vh' },
        }}
        src={`https://www.youtube.com/embed/${video}?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playlist=${video}`} 
        frameBorder="0" 
        allowFullScreen 
      />
      <button
        onClick={scrollDown}
        sx={{ 
          position: 'absolute',
          bottom: 7,
          fontSize: 3,
          textAlign: 'center', 
          color: 'text', 
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
    </div>
  );
}

export default Hero;

Hero.propTypes = {
  video: PropTypes.string.isRequired,
  scrollToRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
}
