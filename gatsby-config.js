require('dotenv').config({ path: '.env' });

module.exports = {
  plugins: [
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-fontawesome-css',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'media',
        path: `${__dirname}/static/media`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data/`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-transformer-yaml',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/gatsby/cms.js`
      }
    },
  ],
};
