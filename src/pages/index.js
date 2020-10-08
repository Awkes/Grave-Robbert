/** @jsx jsx */
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { jsx } from 'theme-ui';

import FacebookFeed from '../components/FacebookFeed';
import FrontpageNews from '../components/FrontpageNews';
import Gigs from '../components/Gigs';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Spotify from '../components/Spotify';
import today from '../utils/today';

const Home = ({ data }) => {
  const { 
    frontpage: { 
      video, 
      news: { heading: newsHeading, link: newsLink, noNews },
      live: { heading: liveHeading, link: liveLink, noGigs }
    },
    news: { nodes: newsNodes },
    gigs: { gigs: gigNodes },
    socialYaml: { socialMediaLinks }
  } = data;

  const news = useMemo(() => (
    newsNodes
      .map(({ excerpt, frontmatter, id, fields }) => ({ excerpt, ...frontmatter, id, ...fields }))
  ), [newsNodes]);

  const gigs = useMemo(() => (
    gigNodes
      .filter(a => new Date(a.date) >= today())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5)
  ), [gigNodes]);

  const [facebookUrl, spotifyUrl] = useMemo(() => ([
    socialMediaLinks.find(({ title }) => title === 'Facebook')?.link,
    socialMediaLinks.find(({ title }) => title === 'Spotify')?.link
  ]), [socialMediaLinks]);

  return (
    <Layout videoHero={video}>
      <Section heading={newsHeading} link="/news" linkText={newsLink}>
        <FrontpageNews news={news} noNews={noNews} />
      </Section>
      <Section>
        <div sx={{ 
          display: 'grid',
          columnGap: 5,
          rowGap: 8,
          gridTemplateColumns: ['1fr', '1fr', 'minmax(300px, 500px) minmax(300px, 680px)'],
          justifyItems: 'center',
        }}>
          <FacebookFeed url={facebookUrl} />
          <Spotify url={spotifyUrl} />
        </div>
      </Section>
      <Section heading={liveHeading} link="/live" linkText={liveLink}>
        <Gigs gigs={gigs} noGigs={noGigs} />
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
    frontpage: pagesYaml(slug: {eq: ""}) {
      video
      news {
        heading
        link
        noNews
      }
      live {
        heading
        link
        noGigs
      }
    }
    gigs: pagesYaml(slug: {eq: "live"}) {
      gigs {
        date(formatString: "MMM DD YYYY")
        id
        link
        location
        venue
      }
    }
    news: allMarkdownRemark(
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