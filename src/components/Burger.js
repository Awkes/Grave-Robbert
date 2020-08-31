/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

const Burger = ({ toggled, onClick }) => (
  <button
    onClick={onClick}
    sx={{
      transform: ['scale(0.75)', 'none'],
      width:'52px',
      height:'50px',
      position: 'relative',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      padding: 0,
      margin: 0,
      overflow: 'hidden',
      border: 'none',
      '&, span': {
        display: 'block',
        borderRadius: '2px',
        transitionDuration: '.2s',
        transitionTimingFunction: 'ease-in-out',
      }
    }}
  >
    {/* Burger */}
    <span 
      sx={{
        position: 'absolute',
        top: 0,
        '& > span': {
          width: toggled ? 0 : '40px',
          height: '4px',
          position: 'relative',
          top: '0px',
          left: '6px',
          margin: '10px 0',
          backgroundColor: 'primary',
        }
      }}
    >
      <span sx={{ transitionDelay: toggled ? '0s' : '.5s' }} />
      <span sx={{ transitionDelay: toggled ? '.125s' : '.625s' }} />
      <span sx={{ transitionDelay: toggled ? '.25s' : '.75s' }} />
    </span>

    {/* Cross */}
    <span 
      sx={{
        position: 'absolute',
        height: '50px',
        width: '50px',
        top: '-17px',
        left: '4px',
        transform: 'rotate(45deg)',
        '& > span': { backgroundColor: 'primary' },
      }}
    >
      <span sx={{
        height: toggled ? '40px' : '0',
        width: '4px',
        position: 'absolute',
        top: '20px',
        left: '34px',
        transitionDelay: toggled ? '.625s' : '0s',
      }} />
      <span sx={{
        width: toggled ? '40px' : '0',
        height: '4px',
        position: 'absolute',
        left: '16px',
        top: '38px',
        transitionDelay: toggled ? '.375s' : '.25s',
      }} />
    </span>
  </button>
);

export default Burger;

Burger.propTypes = {
  onClick: PropTypes.func.isRequired,
  toggled: PropTypes.bool,
}

Burger.defaultProps = {
  toggled: false,
}