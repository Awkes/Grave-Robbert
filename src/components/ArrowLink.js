/** @jsx jsx */
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

const ArrowLink = ({ children, to }) => (
  <Link 
    sx={{
      fontFamily: 'button',
      fontWeight: 'normal',
      fontSize: 5,
      color: 'text',
      paddingY: 2,
      textDecoration: 'none',
      textShadow: 0,
      display: 'inline-flex',
      alignItems: 'center',
      '&:hover>svg': {
        transform: 'translateX(5px)',
        
      }
    }}
    to={to}
  >
    {children}
    <FontAwesomeIcon 
      icon={faArrowRight} 
      sx={{ fontSize: 2, marginLeft: 2, transition: 'transform ease-in-out .2s' }} 
    />
  </Link>
);

export default ArrowLink;

ArrowLink.propTypes = {
  children: PropTypes.string,
  to: PropTypes.string.isRequired,
};

ArrowLink.defaultProps = {
  children: null,
}
