/** @jsx jsx */
import { jsx } from 'theme-ui';
import { graphql } from 'gatsby';
import { useRef } from 'react';

import Layout from '../components/Layout';
import Hero from '../components/Hero';

const Home = ({ data }) => {
  const { 
    datoCmsStart: { video }
  } = data;

  const news = useRef(null);

  return (
    <Layout>
      <Hero video={video} scrollToRef={news} />
      <div sx={{ height: '700px' }} ref={news} /> {/* Temporary Fake News Block */}
    </Layout>
  );
}

export default Home;

export const query = graphql`
  query {
    datoCmsStart {
      video
    }
  }
`;