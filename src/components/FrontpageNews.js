/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';

import NewsCard from "./NewsCard";

const FrontpageNews = ({ news }) => {
  return news.length < 1 ? null : (
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
  );
};

export default FrontpageNews;

FrontpageNews.propTypes = {
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

FrontpageNews.defaultProps = {
  news: [],
};