/** @jsx jsx */
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { jsx, Styled } from 'theme-ui';

import Layout from '../components/Layout';
import Section from '../components/Section';

const H2 = Styled.h2;

const Page = ({ data }) => {
  const {
    markdownRemark: {
      frontmatter: { logo, image, title },
      html
    },
  } = data;

  return (
    <Layout heading={title} customLogo={logo}>
      <Section>
         
        {image && <img 
          alt={title}
          src={image}
          sx={{ 
            width: '100%', 
            borderRadius: 0, 
            filter: ({shadows}) => `drop-shadow: ${shadows[0]}`,
          }} 
        />}

        <div 
          dangerouslySetInnerHTML={{ __html: html }} 
          sx={{ 
            fontSize: 3,
            fontFamily: 'body',
            margin: '0 auto',
            paddingTop: 5,
            paddingX: [0, 5, 8],
            'h1': ({ styles: { h1 } }) => h1,
            'h2': ({ styles: { h2 } }) => h2,
            'h3, h4, h5, h6': ({ styles: { h3 } }) => h3,
            'img': {
              maxWidth: '100%', 
              borderRadius: 0,
              filter: ({shadows}) => `drop-shadow: ${shadows[0]}`,
            },
            'a': {
              color: 'primary',
              textDecoration: 'none',
              '&:hover': { 
                textDecoration: 'underline',
                textDecorationColor: ({ colors: { text }}) => text,
              }
            },
            '&>*': {
              maxWidth: '100%',
              overflow: 'auto'
            }
          }}  
        />
 
      </Section>
    </Layout>
  );
};

export default Page;

Page.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
  query ($path: String!) {
    markdownRemark (fields: { slug: { eq: $path } }) {
      frontmatter {
        logo
        image
        title
        type
      }
      html
      fields {
        slug
      }
    }
  }
`;
