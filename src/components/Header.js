/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import Burger from './Burger';
import Logo from './Logo';
import Menu from './Menu';
import SocialMedia from './SocialMedia';
import VideoHero from '../components/VideoHero';

const Header = ({ background, logo, menu, socialMedia, videoHero, scrollToRef }) => {
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
    <header sx={{ minWidth: '320px', zIndex: 100, position: 'relative' }}>
      {videoHero && <VideoHero video={videoHero} scrollToRef={scrollToRef} />}
      <div sx={{
        position: ['fixed', , videoHero ? 'absolute' : 'relative'], 
        display: 'flex', 
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        zIndex: 100,
        width: '100%',
        top: 0
      }}>
        <Logo alt={"Logo"} src={logo} onClick={closeMenu} />
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
            transition: 'transform ease-in-out .2s',
          }}
        >
          <div sx={{
            height: '100%',
            display: 'flex',
            flexDirection: ['column', , 'row'],
            flexWrap: ['nowrap', ,'wrap'],
            justifyContent: ['space-between', , 'flex-end'],
            alignItems: ['center', , 'center'],
            borderTop: ['5px solid', , 'none'],
            borderBottom: ['5px solid', , 'none'],
            borderColor: 'primary',
            overflow: ['auto', , 'visible'],
            paddingTop: [8, , 0],
            paddingBottom: [7, , 0],
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            backgroundImage: [t => 
              `linear-gradient(0deg, ${t.colors.background}, ${t.colors.background}), url(${background})`, , 'none'],
          }}>
            <div sx={{ marginLeft: [0, , 5] }}>
              <Menu links={menu} horizontal={!smallScreen} onClick={closeMenu} right={!smallScreen} />
            </div>
            <div sx={{ marginLeft: [0, , 5], marginTop: [5, , 0] }}>
              <SocialMedia links={socialMedia} />
            </div>
          </div>
        </nav>
        {smallScreen && <Burger toggled={menuOpen} onClick={toggleMenu} />}
      </div>
      
    </header>
  );
}

export default Header;

Header.propTypes = {
  background: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  socialMedia: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  videoHero: PropTypes.string,
  scrollToRef: PropTypes.object,
}

Header.defaultProps = {
  videoHero: null,
  scrollToRef: null,
}