/** @jsx jsx */
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { jsx } from 'theme-ui';

import Gigs from '../components/Gigs';
import Layout from '../components/Layout';
import Section from '../components/Section';
import today from '../utils/today';



const Live = ({ data }) => {
  const { live: { 
    title,
    upcomingHeading,
    noUpcoming,
    pastHeading,
    noPast,
    gigs 
  } } = data;

  const [upcomingGigs, pastGigs] = useMemo(() => {
    const upcomingGigs = [];
    const pastGigs = [];
    gigs.sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach(gig => {
        new Date(gig.date) >= today() 
          ? upcomingGigs.push(gig)
          : pastGigs.push(gig);
      });
    return [upcomingGigs, pastGigs.reverse()];
  }, [gigs]);

  return (
    <Layout heading={title}>
      <Section heading={upcomingHeading}>
        <Gigs gigs={upcomingGigs} noGigs={noUpcoming} />
      </Section>
      <Section heading={pastHeading}>
        <Gigs gigs={pastGigs} noGigs={noPast} removeTickets />
      </Section>
    </Layout>
  );
};

export default Live;

Live.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
  query {
    live: pagesYaml(slug: {eq: "live"}) {
      title
      upcomingHeading
      noUpcoming
      pastHeading
      noPast
      gigs {
        date(formatString: "MMM DD YYYY")
        id
        link
        location
        venue
      }
    }
  }
`;