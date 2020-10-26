/** @jsx jsx */
import { graphql,useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { jsx, Styled } from 'theme-ui';

import Footer from './Footer';
import Header from './Header';

const { hr: Hr, h1: H1 } = Styled;

const Layout = ({ children, heading, videoHero, customLogo, subtitle }) => {
  const main = useRef(null);
  const data = useStaticQuery(graphql`
    query {
      settings: siteYaml(fields: {type: {eq: "settings"}}) {
        logo
        background
        title
        desc
        footer
      }
      menu: siteYaml(fields: {type: {eq: "menu"}}) {
        menuLinks {
          link
          title
          id
        }
      }
      social: siteYaml(fields: {type: {eq: "social"}}) {
        socialMediaLinks {
          link
          title
          id
        }
      }
      partners: siteYaml(fields: {type: {eq: "partners"}}) {
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
    settings: { background, logo, title, desc, footer },
    menu: { menuLinks },
    social: { socialMediaLinks },
    partners: { partnerLinks }
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
      <Helmet>
        <title>{title + (subtitle ? ` | ${subtitle}`: '')}</title>
        <meta content={desc} name="description" />
      </Helmet>
      
      <Header background={background} logo={customLogo || logo} menu={menuLinks} scrollToRef={main} socialMedia={socialMediaLinks} videoHero={videoHero} />

      <main 
        ref={main} 
        sx={{ 
          flexGrow: 1,
          margin: '0 auto',
          maxWidth: 'maxWidth',
          width: '100%',
          paddingY: 8,
        }}
      >
        {heading && (
          <header sx={{ textAlign: 'right', paddingX: [2, 5, null, 0], marginBottom: [4, 7] }}>
            <H1>{heading}</H1>
            <Hr />
          </header>
        )}
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
  customLogo: PropTypes.node,
  heading: PropTypes.string,
  subtitle: PropTypes.string,
  videoHero: PropTypes.string,
};

Layout.defaultProps = {
  customLogo: null,
  heading: null,
  subtitle: null,
  videoHero: null,
};