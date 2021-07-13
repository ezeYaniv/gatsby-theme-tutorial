// NOTE: this builds on the _original gatsby-config by allowing options to be passed into the theme. 
// In particular, we are passing contentPath and basePath as options

module.exports = ({ contentPath = 'data', basePath = '/' }) => ({
  plugins: [
    'gatsby-plugin-theme-ui',
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: contentPath,
      },
    },
    {
      resolve: "gatsby-transformer-yaml",
      options: {
        typeName: "Event",
      },
    },
  ],
})