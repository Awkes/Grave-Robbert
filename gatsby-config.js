require('dotenv').config({ path: '.env' });

module.exports = {
  plugins: [
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-fontawesome-css',
    {
      resolve: 'gatsby-source-datocms',
      options: {
        apiToken: process.env.API_TOKEN
      }
    }
  ],
}
