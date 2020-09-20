/** @jsx jsx */
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

import Layout from '../components/Layout';
import NewsSection from '../components/NewsSection';

const Home = ({ data }) => {
  const { 
    allPagesYaml: { 
      nodes: [ { 
        video, 
        news: { heading: newsHeading, link: newsLink }
      } ] },
    allMarkdownRemark: { nodes }
  } = data;

  const news = nodes.map(({ excerpt, frontmatter, id, fields }) => ({ excerpt, ...frontmatter, id, ...fields }));

  return (
    <Layout videoHero={video}>
      <NewsSection heading={newsHeading} link={newsLink} news={news} />
    </Layout>
  );
};

export default Home;

Home.propTypes = {
  data: PropTypes.shape({
    allPagesYaml: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          video: PropTypes.string,
        })
      ),
    }),
    allMarkdownRemark: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          frontmatter: PropTypes.shape({
            date: PropTypes.string,
            image: PropTypes.string,
            title: PropTypes.string
          }),
          fields: PropTypes.shape({
            slug: PropTypes.string,
          }),
          id: PropTypes.string,
          excerpt: PropTypes.string,
        })
      )
    })
  }).isRequired
};

export const query = graphql`
  query {
    allPagesYaml(filter: {slug: {eq: ""}}) {
      nodes {
        video
        news {
          heading
          link
        }
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {type: {eq: "news"}}},
      sort: {fields: frontmatter___date, order: DESC},
      limit: 4
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMM DD")
          image
          title
          type
        }
        id
        excerpt
        fields {
          slug
        }
      }
    }
  }
`;