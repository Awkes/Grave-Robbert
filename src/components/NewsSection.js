/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx, Styled } from 'theme-ui';

import ArrowLink from "./ArrowLink";
import NewsCard from "./NewsCard";

const NewsSection = ({ heading, link, news }) => {
  const { h2: H2 } = Styled;
  return news.length < 1 ? null : (
    <section sx={{
      padding: [2, 5],
      margin: '0 auto',
      maxWidth: 'maxWidth',
    }}>
      <H2>{heading}</H2>
      <div sx={{ 
        marginY: 5,
        display: 'grid',
        gridTemplateRows: ['auto 1fr 1fr 1fr', null, '1fr 1fr 1fr'],
        gridTemplateColumns: ['1fr', null, '1fr 1fr'],
        alignItems: 'start',
        gap: 4,
        '&>*:first-of-type': { gridRow: [null, null, '1 / 4'] }
      }}>
        {news.map(({ id, date, image, title, excerpt, slug }, i) => (
          <NewsCard 
            date={date} 
            excerpt={excerpt} 
            image={image} 
            invert={i === 2} 
            key={id}
            slug={slug}
            small={i > 0}
            title={title} 
          />
        ))}
      </div>
      <div sx={{ textAlign: 'right' }}>
        <ArrowLink to="/news">{link}</ArrowLink>
      </div>
    </section>
  );
};

export default NewsSection;

NewsSection.propTypes = {
  heading: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  news: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      image: PropTypes.string,
      title: PropTypes.string,
      id: PropTypes.string,
      excerpt: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

NewsSection.defaultProps = {
  news: [],
};