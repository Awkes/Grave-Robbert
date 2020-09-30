/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx, Styled } from 'theme-ui';

import ArrowLink from "./ArrowLink";

const Section = ({ children, heading, link, linkText }) => {
  const { h2: H2 } = Styled; 
  return (
    <section sx={{
      paddingX: [2, 5, null, 0],
      paddingY: [2, 5],
    }}>
      {heading && <H2>{heading}</H2>}
      
      <div sx={{ marginY: 5 }}>
        {children}
      </div>

      {link && <div sx={{ textAlign: 'right' }}>
        <ArrowLink to={link}>{linkText || '&nbsp;'}</ArrowLink>
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