/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

const FigureButton = ({ caption, image, onClick }) => (
  <figure sx={{ margin: 0, padding: 0 }}>
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
      <img 
        alt={caption}
        src={image}
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: 0,
          boxShadow: 0,
          backgroundColor: 'secondaryTrans',
        }}
      />
    </button>
    <figcaption sx={{ textAlign: 'center', fontFamily: 'body', fontSize: 3 }}>
      {caption}
    </figcaption>
  </figure>
);

export default FigureButton;

FigureButton.propTypes = {
  caption: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};