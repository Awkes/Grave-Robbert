/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx, Styled } from 'theme-ui';

import ArrowLink from "./ArrowLink";

const Section = ({ children, heading, link, linkText }) => {
  const { h2: H2 } = Styled; 
  return (
    <section sx={{
      padding: [2, 5],
      margin: '0 auto',
      maxWidth: 'maxWidth',
    }}>
      {heading && <H2>{heading}</H2>}
      
      {children}

      {link && <div sx={{ textAlign: 'right' }}>
        <ArrowLink to={link}>{linkText}</ArrowLink>
      </div>}
    </section>
  );
};

export default Section;

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  heading: PropTypes.string,
  link: PropTypes.string,
  linkText: PropTypes.string,
};

Section.defaultProps = {
  heading: null,
  link: null,
  linkText: null,
};