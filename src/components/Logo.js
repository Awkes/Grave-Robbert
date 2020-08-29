/** @jsx jsx */
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

const Logo = ({ alt, src }) => (
  <Link to="/">
    <img 
      alt={alt} 
      src={src} 
      sx={{
        maxWidth: '100%',
        width: ['200px', '300px']
      }}
    />
  </Link>
);

export default Logo;

Logo.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};