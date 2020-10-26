/** @jsx jsx */
import { jsx } from 'theme-ui';

const Textarea = (props) => (
  <textarea 
    sx={{ 
      width: '100%',
      border: 0,
      fontSize: 2,
      fontFamily: 'body',
      color: 'text',
      padding: 2,
      backgroundColor: 'secondaryTrans',
      marginTop: 2,
      resize: 'none',
      height: '200px',
      '&:focus': { backgroundColor: 'secondary' }
    }} 
    {...props}
  />
);

export default Textarea;