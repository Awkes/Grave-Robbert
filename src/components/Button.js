/** @jsx jsx */
import { jsx } from 'theme-ui';

const Button = (props) => (
  <button
    sx={{ 
      width: '100%',
      border: 0,
      fontSize: 2,
      fontFamily: 'body',
      color: 'text',
      padding: 2,
      backgroundColor: 'primaryTrans',
      cursor: 'pointer',
      fontWeight: 'bold',
      textShadow: 0, 
      transition: 'background-color .2s',
      '&:hover': { backgroundColor: 'primary' },
      '&:disabled': { 
        cursor: 'default',
        backgroundColor: 'muted',
        color: 'secondaryTrans',
        borderColor: 'secondaryTrans',
      }
    }} 
    {...props}
  />
);

export default Button;