/** @jsx jsx */
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { jsx, useThemeUI } from 'theme-ui';

import Layout from '../components/Layout';
import NewsCard from '../components/NewsCard';
import Section from '../components/Section';

const News = ({ data, pageContext }) => {   
  const { 
    allMarkdownRemark: { nodes },
    newsPage: { title, noNews }
  } = data;
  
  const { currentPage, numPages, basePath } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? basePath : `${basePath}/${currentPage-1}`;
  const nextPage = `${basePath}/${currentPage+1}`;

  const { theme: { colors : { secondary }} } = useThemeUI();

  return (
    <Layout heading={title}>
      <Section>
        <div sx={{
          display: 'grid',
          gridTemplateColumns: ['1fr', null, '1fr 1fr', '1fr 1fr 1fr'],
          gap: 5,
        }}>
          {nodes.length > 0 ?
            nodes.map(({ id, frontmatter, excerpt, fields }) => (
              <NewsCard 
                date={frontmatter.date} 
                excerpt={excerpt} 
                image={frontmatter.image} 
                key={id}
                slug={fields.slug}
                title={frontmatter.title} 
              />
            ))
            : {noNews}
          }
        </div>
      </Section>
             
      <Section>
        <nav sx={{ 
          display: 'flex',
          alignItems: 'center',
          margin: '0 auto',
          width: 'fit-content',
        }}>
          {!isFirst && (
            <Link sx={{ color: 'text' }} to={prevPage}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
          )}
          <ul sx={{
            textAlign: 'center',
            paddingY: 0,
            paddingX: 5,
            width: 'fit-content',
            listStyleType: 'none',
          }}> 
            {Array.from({length: numPages}).map((_, i) => (
              <li key={`page${i+1}`} sx={{ display: 'inline-block' }}>
                <Link
                  activeStyle={{ backgroundColor: secondary }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    fontFamily: 'body',
                    textDecoration: 'none',
                    color: 'text',
                    borderRadius: '50%',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                  to={basePath + (i === 0 ? '' : `/${i+1}`)}
                >
                  {i + 1}
                </Link>
              </li>
            ))}
          </ul>

          {!isLast && (
            <Link sx={{ color: 'text' }} to={nextPage}>
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          )}
        </nav>
      </Section>
    </Layout>
  );
};

export default News;

News.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    newsPage: pagesYaml(slug: {eq: "news"}) {
      title
      noNews
    }
    allMarkdownRemark(
      filter: {frontmatter: {type: {eq: "news"}}}
      sort: {fields: frontmatter___date, order: DESC}
      limit: $limit
      skip: $skip
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
  }
`;