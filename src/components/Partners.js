/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

import Image from "./Image";

const Partners = ({ links }) => (
  <section 
    sx={{ 
      backgroundColor: 'secondary', 
      paddingY: 5, 
      borderTop: 0, 
      borderBottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
    }}
  >
    {links.map(({ title, link, id, image }) => (
      <a 
        href={link} 
        key={id}
        rel="noreferrer noopener" 
        sx={{ margin: 2 }}
        target="_blank"
      >
        <Image
          alt={title}
          image={image}
          imgStyle={{ objectFit: 'scale-down' }}
          style={{ width: '300px', height: '50px' }}
        />
      </a>
    ))}
  </section>
);

export default Partners;

Partners.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
      id: PropTypes.string,
      image:PropTypes.object,
    })
  ).isRequired,
};