const { createFilePath } = require('gatsby-source-filesystem');
const path = require('path');

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  // Create slugs for News Posts
  if (node.internal.type === 'MarkdownRemark' && /\/news\//.test(node.fileAbsolutePath)) {
    const slug = createFilePath({ node, getNode, basePath: 'news' });
    createNodeField({ node, name: 'slug', value: '/news'+slug });
  }

  // Create slugs for Custom Pages
  else if (node.internal.type === 'MarkdownRemark' && /\/custom-pages\//.test(node.fileAbsolutePath)) {
    const slug = createFilePath({ node, getNode, basePath: 'custom-pages' });
    createNodeField({ node, name: 'slug', value: '/page'+slug });
  }
};

exports.createPages = async ({ graphql, actions: { createPage }, reporter }) => {
  // Query News Posts and Custom Pages
  const result = await graphql(`
    query {
      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/news/" } }
      ) {
        nodes {
          fields {
            slug
          }
        }
      }
      customPages: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/custom-pages/" } }
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
    reporter.panicOnBuild('Error while running GraphQL queries.');
    return;
  }

  const posts = result.data.posts.nodes;
  const customPages = result.data.customPages.nodes;
 
  // Create News Pages
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
  
  // Create News Posts
  posts.forEach(({ fields: { slug } }) => {  
    createPage({ 
      path: slug, 
      component: path.resolve('./src/templates/news-post.js'),
      context: { slug }
    });
  });
  
  // Create custom pages 
  customPages.forEach(({ fields: { slug } }) => {  
    createPage({ 
      path: slug, 
      component: path.resolve('./src/templates/custom-page.js'),
      context: { slug }
    });
  });
};