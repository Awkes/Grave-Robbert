require('dotenv').config({ path: '.env' });

module.exports = {
  plugins: [
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-fontawesome-css',
    'gatsby-plugin-netlify-cms',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data/`
      }
    },
    'gatsby-transformer-yaml',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
}
