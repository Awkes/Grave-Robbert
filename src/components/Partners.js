/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

const Partners = ({ links }) => (
  <section sx={{ backgroundColor: 'secondary', paddingY: 5, borderTop: 0, borderBottom: 0 }}>
    <ul 
      sx={{ 
        listStyleType: 'none', 
        margin: 0, 
        padding: 0, 
        textAlign: 'center',
      }}
    >
      {links.map(({ name, link, id, image }) => (
        <li 
          key={id}
          sx={{ 
            display: 'inline-block',
            paddingX: 3,
            paddingY: 2,
          }}
        >
            <a 
              href={link} 
              rel="noreferrer noopener" 
              target="_blank"
              >
              <img src={image} alt={name} sx={{ height: '40px', maxWidth: '100%' }} />
            </a>
          </li>
      ))}
    </ul>
  </section>
);

export default Partners;

Partners.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
};