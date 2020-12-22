/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

import Image from './Image';

const FigureButton = ({ caption, image, onClick }) => (
  <figure sx={{ display: 'grid', gap: 3, margin: 0, padding: 0 }}>
    <button 
      onClick={onClick}
      sx={{ 
        display: 'block',
        border: 'none',
        margin: 0,
        padding: 0,
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        cursor: 'pointer',
      }}
    >
      <Image 
        alt={caption}
        image={image}
        imgStyle={{ 
          objectFit: 'contain', 
          height: 'unset',
        }}
        sx={{
          width: '100%',
          height: '100%',
          '& img': {
            borderRadius: 0,
            boxShadow: 0,
            backgroundColor: 'secondaryTrans',
          }
        }}
      />
    </button>
    <figcaption sx={{ display: 'block', textAlign: 'center', fontFamily: 'body', fontSize: 3 }}>
      {caption}
    </figcaption>
  </figure>
);

export default FigureButton;

FigureButton.propTypes = {
  caption: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};