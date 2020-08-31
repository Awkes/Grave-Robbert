/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { 
  faFacebook,
  faLinkedin, 
  faInstagram, 
  faItunesNote, 
  faSnapchat,
  faSoundcloud, 
  faSpotify, 
  faTwitter, 
  faYoutube, 
} from '@fortawesome/free-brands-svg-icons';

const SocialMedia = ({ links }) => (
  <ul sx={{ listStyleType: 'none', margin: 0, padding: 0, textAlign: 'center' }}>
    {links.map(({ title, link, id }) => {
      const icon = (() => {
        switch (title) {
          case 'Facebook':
            return faFacebook;
          case 'LinkedIn':
            return faLinkedin;
          case 'Instagram':
            return faInstagram;
          case 'Itunes':
          case 'Apple Music':
            return faItunesNote;
          case 'Snapchat':
            return faSnapchat;
          case 'Soundcloud':
            return faSoundcloud;
          case 'Spotify':
            return faSpotify;
          case 'Twitter':
            return faTwitter;
          case 'YouTube':
            return faYoutube;
          default:
            return faLink;
        }
      })();
      return (
        <li 
          key={id}
          sx={{ display: 'inline-block' }}
        >
          <a 
            href={link} 
            rel="noreferrer noopener" 
            sx={{ 
              display: 'block', 
              paddingY: 1,
              paddingX: 2,
              color: 'primary',
              fontSize: 4,
              transition: 'ease-in-out .2s',
              filter: t => `drop-shadow(${t.shadows[1]})`,
              '@media(pointer: fine)': {
                '&:hover': {
                  transform: 'translateY(4px)',
                  filter: 'none',
                }
              }
            }} 
            target="_blank"
          >
            <FontAwesomeIcon icon={icon} />
          </a>
        </li>
    )})}
  </ul>
);

export default SocialMedia;

SocialMedia.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
};