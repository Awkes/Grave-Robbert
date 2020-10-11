/** @jsx jsx */
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { jsx, Styled } from 'theme-ui';

import Layout from '../components/Layout';
import Section from '../components/Section';

const H2 = Styled.h2;

const News = ({ data }) => {
  const {
    markdownRemark: {
      frontmatter: { date, image, title },
      html
    },
    pagesYaml: { title: newsTitle }
  } = data;

  return (
    <Layout heading={newsTitle}>
      <Section>
        <article>
          <header sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
          }}>
            <H2>{title}</H2>
            <time 
              sx={{ 
                fontFamily: 'body',
                fontSize: 3,
                textAlign: 'right',
                marginLeft: 2,
              }}
            >
              {date}
            </time>
          </header>
          
          <img 
            alt={title}
            src={image}
            sx={{ width: '100%', borderRadius: 0, boxShadow: 0, marginY: 4 }} 
          />

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
                borderRadius: 0,
                boxShadow: 0,
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
        </article>       
      </Section>
    </Layout>
  );
};

export default News;

News.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
  query ($path: String!) {
    markdownRemark (fields: { slug: { eq: $path } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY - HH:mm")
        image
        title
        type
      }
      html
      fields {
        slug
      }
    }
    pagesYaml(slug: {eq: "news"}) {
      title
    }
  }
`;