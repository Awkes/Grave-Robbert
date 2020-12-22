/** @jsx jsx */
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

import Image from "./Image";

const Logo = ({ alt, src, onClick }) => (
  <Link onClick={onClick} to="/">
    <Image 
      alt={alt} 
      image={src}
      sx={{
        display: 'block',
        width: ['200px', '300px'],
        filter: ({shadows}) => `drop-shadow(${shadows[0]})`,
      }}
    />
  </Link>
);

export default Logo;

Logo.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

Logo.defaultProps = {
  onClick: null,
};