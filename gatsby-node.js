const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

// Create slugs for news-posts
exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  if (node.internal.type === 'MarkdownRemark' && /\/news\//.test(node.fileAbsolutePath)) {
    const slug = createFilePath({ node, getNode, basePath: 'news' });
    createNodeField({ node, name: 'slug', value: '/news'+slug });
  }
};

exports.createPages = async ({ graphql, actions: { createPage }, reporter }) => {
  // Query news-posts
  const result = await graphql(`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/news/" } }
      ) {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `); 
  
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query');
    return;
  }

  const posts = result.data.allMarkdownRemark.nodes;
  
  // Create news-pages
  const postsPerPage = 12;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/news' : `/news/${i+1}`,
      component: path.resolve('./src/templates/news-page.js'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i+1,
        basePath: '/news',
      }
    });
  });
  
  // Create news-posts
  posts.forEach(({ fields: { slug } }) => {  
    createPage({ 
      path: slug, 
      component: path.resolve('./src/templates/news-post.js'),
      context: { slug }
    });
  });
};
