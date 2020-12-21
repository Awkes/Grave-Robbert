/** @jsx jsx */
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { jsx, Styled } from 'theme-ui';

const H2 = Styled.h2;

const DiscoItem = ({ date, image, info, links, title, tracks }) => (
  <article sx={{
    maxHeight: '100%',
    maxWidth: 'maxWidth',
    display: 'grid',
    gap: 5,
    gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
    padding: [2, 5],
    fontFamily: 'body',
    fontSize: 3,
  }}>
    <img 
      alt={title} 
      src={image} 
      sx={{
        gridRow: ['1 / 2', '1 / 2', '1 / 6'] ,
        maxWidth: '100%',
        borderRadius: 0,
        boxShadow: 0,
        backgroundColor: 'secondaryTrans',
      }}
    />

    <div>
      <H2>{title}</H2>
      <span>{date}</span>
    </div>

    <div>
      {links.map(({ id, link, title }) => (
        <Fragment key={id}>
          [ <a 
            href={link} 
            rel="noreferrer" 
            sx={{ 
              color: 'primary',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
                textDecorationColor: ({ colors }) => colors.text,
              }
            }} 
            target="_blank"
          >
            {title}
          </a> ]
        </Fragment>
      ))}
    </div>

    <div>
      {info}
    </div>

    <ol>
      {tracks.map(({ id, track }) => (
        <li key={id}>{track}</li>
      ))}
    </ol>

  </article>
);

export default DiscoItem;

DiscoItem.propTypes = {
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      id: PropTypes.string,
      title: PropTypes.stsring,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      track: PropTypes.string, 
      id: PropTypes.string,
    })
  ).isRequired,
};
