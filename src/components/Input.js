/** @jsx jsx */
import { jsx } from 'theme-ui';

const Input = (props) => (
  <input 
    sx={{ 
      width: '100%',
      border: 0,
      fontSize: 2,
      fontFamily: 'body',
      color: 'text',
      padding: 2,
      backgroundColor: 'secondaryTrans',
      marginTop: 2,
      '&:focus': { backgroundColor: 'secondary' }
    }} 
    {...props}
  />
);

export default Input;