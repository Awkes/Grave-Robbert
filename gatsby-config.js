require('dotenv').config({ path: '.env' });

module.exports = {
  plugins: [
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-fontawesome-css',
    'gatsby-plugin-netlify-cms',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
}
