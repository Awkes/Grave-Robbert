/** @jsx jsx */
import { faPauseCircle, faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { jsx } from 'theme-ui';

const VideoHero = ({ video, scrollToRef }) => {
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(true);
  const videoRef = useRef(null);
  
  function scrollDown(e) {
    window?.scrollTo(0, scrollToRef?.current?.offsetTop);
    e.currentTarget.blur();
  }

  function togglePlay() {
    const video = videoRef?.current;
    video.paused ? video.play() : video.pause();
    setPaused(state => !state);
  }

  function toggleSound() {
    const video = videoRef?.current;
    video.muted = !video.muted;
    setMuted(state => !state);
  }
  
  function videoLoad() {
    setMuted(videoRef?.current.muted);
    setPaused(videoRef?.current.paused);
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
        onPlaying={videoLoad}
        ref={videoRef}
        sx={{
          minWidth: '100%',
          minHeight: '100%',
          maxWidth: '100%',
          objectFit: 'cover'
        }}
      >
        <source src={video} />
      </video>
      
      <div sx={{
        position: 'absolute',
        bottom: ({ space, fontSizes }) => (2 * space[7]) + fontSizes[3] ,
        right: '50%',
        transform: 'translateX(50%)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 7,
        '& > button': {
          border: 'none',
          backgroundColor: 'transparent',
          filter: ({shadows}) => `drop-shadow(${shadows[1]})`,
          cursor: 'pointer',
          fontSize: 4,
        }
      }}>
        <button 
          onClick={togglePlay} 
          sx={{ color: paused ? 'primary' : 'primaryTrans', justifySelf: 'right' }}
        >
          <FontAwesomeIcon icon={paused ? faPlayCircle : faPauseCircle} />
        </button>
        <button 
          onClick={toggleSound} 
          sx={{ color: muted ? 'primary' : 'primaryTrans', justifySelf: 'left' }}
        >
          <FontAwesomeIcon icon={muted ? faVolumeUp : faVolumeMute} />
        </button>
      </div>
      
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
