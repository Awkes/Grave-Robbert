/** @jsx jsx */
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import { jsx, Styled } from 'theme-ui';

import Menu from './Menu';
import Partners from './Partners';
import SocialMedia from './SocialMedia';

const Footer = ({ menu, partners, socialMedia, text }) => {
  const { hr: Hr } = Styled;

  function scrollToTop(e) {
    window?.scrollTo(0, 0);
    e.currentTarget.blur();
  }

  return (
    <footer>
      <Hr />
      <button
        onClick={scrollToTop}
        sx={{ 
          display: 'block',
          width: '100%',
          padding: 3,
          paddingBottom: 4,
          fontSize: 3,
          textAlign: 'center', 
          color: 'text', 
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
      <Partners links={partners} />
      <nav sx={{ display: 'grid', gap: 3, padding: 2, backgroundColor: 'muted' }}>
        <Menu horizontal links={menu} small />
        <SocialMedia links={socialMedia} />
      </nav>
      <div 
        sx={{
          fontFamily: 'button',
          fontSize: 3,
          textAlign: 'center',
          paddingY: 5,
          paddingX: 2,
          backgroundColor: 'muted',
        }}
      >
        {text}
      </div>
    </footer>
  );
};

export default Footer;

Footer.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
      url: PropTypes.string,
      id: PropTypes.string
    })
  ).isRequired,
  partners: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
      id: PropTypes.string,
      image: PropTypes.object,
    })
  ).isRequired,
  socialMedia: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  text: PropTypes.string.isRequired,
};