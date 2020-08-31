/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import BackgroundImage from 'gatsby-background-image';

import Burger from './Burger';
import Logo from './Logo';
import Menu from './Menu';
import SocialMedia from './SocialMedia';

const Header = ({ background, logo, menu, socialMedia }) => {
  const { theme } = useThemeUI();
 
  const [menuOpen, setMenuOpen] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  
  function toggleMenu(e) {
    setMenuOpen(state => !state);
    e.screenY > 0 && e.screenX > 0 && e.currentTarget.blur();
  }

  function closeMenu() {
    menuOpen && setMenuOpen(false);
  }

  function handleResize() {
    window.innerWidth < Number(theme.breakpoints[1].replace(/\D/g, ''))
      ? setSmallScreen(true)
      : setSmallScreen(false);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header 
        sx={{ 
          padding: 2, 
          position: ['fixed', , 'static'], 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          minWidth: '320px',
          zIndex: 100,
        }}
    >
      <Logo alt={logo?.alt || ''} src={logo?.url} onClick={closeMenu} />
      <nav 
        sx={{ 
          position: ['fixed', ,'static'],
          width: ['100%', , 'unset'],
          height: '100%',
          top: 0,
          left: 0,
          flexGrow: 1,
          zIndex: -1,
          transform: [menuOpen ? 'translateY(0)' : 'translateY(100%)', , 'translateY(0)'],
          opacity: [menuOpen ? 1 : 0, , 1],
          transition: 'ease-in-out .2s',
        }}
      >
        <BackgroundImage 
          fluid={background}
          sx={{
            width: '100%',
            height: '100%',
            '&::before': { backgroundImage: ['initial', , 'none !important'] },
            '&::after': { backgroundImage: ['initial', , 'none !important'] },
          }}
        >
          <div sx={{
            height: '100%',
            display: 'flex',
            flexDirection: ['column', , 'row'],
            flexWrap: 'wrap',
            justifyContent: ['space-between', , 'flex-end'],
            alignItems: ['center', , 'center'],
            borderTop: ['5px solid', , 'none'],
            borderBottom: ['5px solid', , 'none'],
            borderColor: 'primary',
            overflow: ['auto', , 'visible'],
            paddingTop: [8, , 0],
            paddingBottom: [7, , 0],
            backgroundImage: [t => `
              linear-gradient(0deg, ${t.colors.background}, ${t.colors.background})
            `, , 'none'],
          }}>
            <Menu links={menu} horizontal={!smallScreen} onClick={closeMenu} right={!smallScreen} />
            <SocialMedia links={socialMedia} />
          </div>
        </BackgroundImage>
      </nav>
      { 
        smallScreen &&
        <Burger toggled={menuOpen} onClick={toggleMenu} />
      }
    </header>
  );
}

export default Header;

Header.propTypes = {
  background: PropTypes.object.isRequired,
  logo: PropTypes.shape({
    alt: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.shape({
        slug: PropTypes.string
      }),
      url: PropTypes.string,
      id: PropTypes.string,
      __typename: PropTypes.string,
    })
  ).isRequired,
  socialMedia: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
}