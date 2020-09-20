const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

// Create slugs for news
exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  if (node.internal.type === 'MarkdownRemark' && /\/news\//.test(node.fileAbsolutePath)) {
    const slug = createFilePath({ node, getNode, basePath: 'news' });
    createNodeField({ node, name: 'slug', value: '/news'+slug });
  }
};

// Create news-pages
exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/news/" }}) {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `);
  
  if (result.data) {
    result.data.allMarkdownRemark.nodes.forEach(({ fields: { slug } }) => {
      createPage({ 
        path: slug, 
        component: path.resolve('./src/templates/news.js'),
        context: { slug }
      });
    });
  }
};
