/** @jsx jsx */
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

const NewsCard = ({ title, date, image, invert, excerpt, slug, small }) => (
  <article
    sx={{
      position: 'relative',
      backgroundColor: 'secondaryTrans',
      boxShadow: 0,
      borderRadius: 0,
      overflow: 'hidden',
      display: 'grid',
      gridTemplateRows: small ? null : '60% auto 25px',
      gridTemplateColumns: small 
        ? (!invert ? '30% auto min-content' : 'min-content auto 30%') 
        : null,
      fontFamily: 'body',
      fontSize: 2,
      width: '100%',
      height: small ? '150px' : '500px',
      transition: 'background-color ease-in-out .2s',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'secondary',
        '&>time': { backgroundColor: 'primary' },
        '&>div>img': { opacity: '1', transform: 'scale(1.1)' },
      }
    }}
  >   
    {image && <div sx={{ 
      overflow: 'hidden',
      borderBottom: small ? 'none' : 1,
      borderRight: small && !invert ? 1 : 'none',
      borderLeft: small && invert ? 1 : 'none',
      order: invert ? 3 : null,
    }}>
      <img 
        alt={title}
        src={image} 
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: '0.85',
          transition: 'opacity ease-in-out .2s, transform ease-in-out .2s',
        }} 
      />
    </div>}

    <div sx={{ 
      padding: 3, 
      order: invert ? 2 : null,
      gridColumn: small && !image ? 'span 2' : null,
      gridRow: !small && !image ? 'span 2' : null,
      overflow: 'hidden',
      background: ({ colors: { text }}) => `linear-gradient(${text}, ${text}, ${text}, transparent)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}>
      <h3 sx={{ marginTop: 0, marginBottom: 2 }}>{title}</h3>
      <p sx={{ margin: 0 }}>{excerpt}</p>
    </div>

    <time 
      sx={{
        backgroundColor: 'primaryTrans',
        color: 'muted',
        borderTop: small ? 'none' : 1,
        borderLeft: small ? 1 : 'none',
        textAlign: 'center',
        textTransform: 'uppercase',
        writingMode: small ? 'vertical-rl' : null,
        order: invert ? 1 : null,
        transform: invert ? 'rotate(180deg)' : null,
        transition: 'inherit',
      }}
    >
      {date}
    </time>
    <Link sx={{ position: 'absolute', width: '100%', height: '100%' }} to={slug} />
  </article>
);

export default NewsCard;

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  image: PropTypes.string,
  invert: PropTypes.bool,
  slug: PropTypes.string.isRequired,
  small: PropTypes.bool,
};

NewsCard.defaultProps = {
  image: null,
  invert: false,
  small: false,
};