/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';
import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      datoCmsWebsite {
        background { fluid { ...GatsbyDatoCmsFluid } }
        logo { alt, url }
        menuItems {
          ... on DatoCmsInternalLink {
            id
            title
            link {
              ... on DatoCmsNews { slug }
              ... on DatoCmsBand { slug }
              ... on DatoCmsMusic { slug }
              ... on DatoCmsLive { slug }
              ... on DatoCmsContact { slug }
            }
          }
          ... on DatoCmsExternalLink {
            id
            title
            url
          }
        }
        partners {
          id
          name
          link
          image { url }
        }
        socialMedia {
          id
          title
          link
        }
        text
      }
    }
  `);

  const { 
    datoCmsWebsite: { 
      background: { fluid: background },
      logo,
      menuItems,
      partners,
      socialMedia,
      text
    }
  } = data;

  return (
    <BackgroundImage 
      fluid={background}
      sx= {{
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
      }}
    >
      <div 
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: t => `linear-gradient(0deg, ${t.colors.background}, ${t.colors.background})`,
        }}
      >
        <Header logo={logo} menu={menuItems} socialMedia={socialMedia} background={background} />

        <main sx={{ flexGrow: 1 }}>
          {children}
        </main>

        <Footer menu={menuItems} partners={partners} socialMedia={socialMedia} text={text} />
      </div>
    </BackgroundImage>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired
};