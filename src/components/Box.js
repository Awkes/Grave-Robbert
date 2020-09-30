/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

const Box = ({ children }) => (
  <div
    sx={{
      backgroundColor: 'secondaryTrans',
      boxShadow: 0,
      borderRadius: 0,
      fontFamily: 'body',
      fontSize: 2,
      width: '100%',
      height: '100%',
      padding: 4,
    }}
  >
    {children}
  </div>
);

export default Box;

Box.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};