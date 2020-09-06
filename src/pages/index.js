/** @jsx jsx */
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

import Layout from '../components/Layout';

const Home = ({ data }) => {
  const { 
    allPagesYaml: { nodes: [ { video } ] }
  } = data;

  return (
    <Layout videoHero={video}>
      <div sx={{ height: '700px' }} /> {/* Temporary Fake News Block */}
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
    })
  }).isRequired
};

export const query = graphql`
  query {
    allPagesYaml(filter: {slug: {eq: ""}}) {
      nodes {
        video
      }
    }
  }
`;