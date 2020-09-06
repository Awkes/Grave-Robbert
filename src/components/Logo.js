/** @jsx jsx */
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

const Logo = ({ alt, src, onClick }) => (
  <Link onClick={onClick} to="/">
    <img 
      alt={alt} 
      src={src} 
      sx={{
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        width: ['200px', '300px'],
        filter: ({shadows}) => `drop-shadow(${shadows[0]})`,
      }}
    />
  </Link>
);

export default Logo;

Logo.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

Logo.defaultProps = {
  onClick: null,
};