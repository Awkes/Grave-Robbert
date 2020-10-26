/** @jsx jsx */
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

import Layout from '../../components/Layout';
import Section from '../../components/Section';

const Contact = ({ data }) => {
  const { contact: { title, success } } = data;
  return (
    <Layout heading={title}>
      <Section>
        <div
          sx={{
            paddingX: [0, 5, 8],
            display: 'grid',
            gap: 5,
            gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'], 
            fontSize: 3,
            fontFamily: 'body',
          }}
        >
          <FontAwesomeIcon 
            icon={faEnvelopeOpenText}
            sx={{ 
              color: 'primaryTrans',
              filter: ({ shadows }) => `drop-shadow(${shadows[1]})`,
              fontSize: 7,
              alignSelf: 'center',
              justifySelf: 'center',
              marginRight: [0, 5, 8],
            }}
          />

          <div sx={{ display: 'grid', gap: 3 }}>
            <p>{success}</p>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Contact;

Contact.propTypes = { 
  data: PropTypes.object.isRequired,
};

export const query = graphql`
  query {
    contact: pagesYaml(fields: { type: {eq: "contact"} }) {
      title
      success
    }
  }
`;