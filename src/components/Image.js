/** @jsx jsx */
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

const Image = ({ alt, image, imgStyle, ...rest}) => image?.childImageSharp ? (
  <Img 
    alt={alt}
    fluid={image?.childImageSharp?.fluid}
    imgStyle={imgStyle}
    {...rest}
  />
) : (
  <img alt={alt} src={image?.publicURL} {...rest} />
);
    

export default Image;

Image.propTypes = {
  alt: PropTypes.string,
  image: PropTypes.shape({
    childImageSharp: PropTypes.object,
    publicURL: PropTypes.string,
  }).isRequired,
  imgStyle: PropTypes.object,
};

Image.defaultProps = {
  alt: null,
  imgStyle: null
};