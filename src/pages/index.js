/** @jsx jsx */
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

import FacebookFeed from '../components/FacebookFeed';
import FrontpageNews from '../components/FrontpageNews';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Spotify from '../components/Spotify';

const Home = ({ data }) => {
  const { 
    allPagesYaml: { 
      nodes: [ { 
        video, 
        news: { heading: newsHeading, link: newsLink }
      } ] },
    allMarkdownRemark: { nodes },
    socialYaml: { socialMediaLinks }
  } = data;

  const news = nodes.map(({ excerpt, frontmatter, id, fields }) => ({ excerpt, ...frontmatter, id, ...fields }));
  const facebookUrl = socialMediaLinks.find(({ title }) => title === 'Facebook')?.link;
  const spotifyUrl = socialMediaLinks.find(({ title }) => title === 'Spotify')?.link;

  return (
    <Layout videoHero={video}>
      <Section heading={newsHeading} link="/news" linkText={newsLink}>
        <FrontpageNews news={news} />
      </Section>
      <Section>
        <div sx={{ 
          display: 'grid',
          gap: 4,
          gridTemplateColumns: ['1fr', '1fr', 'minmax(300px, 500px) minmax(300px, 630px)'],
          justifyItems: 'center',
        }}>
          <FacebookFeed url={facebookUrl} />
          <Spotify url={spotifyUrl} />
        </div>
      </Section>
    </Layout>
  );
};

export default Home;

Home.propTypes = {
  data: PropTypes.object.isRequired
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
    socialYaml {
      socialMediaLinks {
        link
        title
      }
    }
  }
`;