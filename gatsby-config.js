module.exports = {
  siteMetadata: {
    siteUrl: "https://artembo.github.com",
    title: "Artembo's Cheet Sheets",
  },
  plugins: [
    "gatsby-plugin-theme-ui",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          pages: require.resolve("./src/components/page-layout.js"),
        }
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: "./src/pages/",
      },
    },
  ],
};
