/** @jsx jsx */
import { graphql,useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { jsx } from 'theme-ui';

import Footer from './Footer';
import Header from './Header';

const Layout = ({ children, videoHero }) => {
  const main = useRef(null);
  const data = useStaticQuery(graphql`
    query {
      settingsYaml {
        logo
        background
        footer
      }
      menuYaml {
        menuLinks {
          link
          title
          id
        }
      }
      socialYaml {
        socialMediaLinks {
          link
          title
          id
        }
      }
      partnersYaml {
        partnerLinks {
          title
          link
          image
          id
        }
      }
    }
  `);

  const { 
    settingsYaml: { background, logo, footer },
    menuYaml: { menuLinks },
    socialYaml: { socialMediaLinks },
    partnersYaml: { partnerLinks }
  } = data;

  return (
    <div sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: t => 
        `linear-gradient(0deg, ${t.colors.background}, ${t.colors.background}), url(${background})`,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'top center',
    }}>
      <Header background={background} logo={logo} menu={menuLinks} scrollToRef={main} socialMedia={socialMediaLinks} videoHero={videoHero} />

      <main ref={main} sx={{ flexGrow: 1 }}>
        {children}
      </main>

      <Footer menu={menuLinks} partners={partnerLinks} socialMedia={socialMediaLinks} text={footer} />
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  videoHero: PropTypes.string,
};

Layout.defaultProps = {
  videoHero: null,
};