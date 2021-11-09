const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://artembo.github.io',
    gaTrackingId: null,
    trailingSlash: true,
  },
  header: {
    logo: '',
    logoLink: 'https://artembo.github.io',
    title: "",
    githubUrl: 'https://github.com/artembo/artembo.github.io',
    helpUrl: '',
    tweetText: '',
    social_: `<li>
		    <a href="https://twitter.com/" target="_blank" rel="noopener">
		      <div class="twitterBtn">
		        <img src='' alt={'Twitter'}/>
		      </div>
		    </a>
		  </li>`,
    links: [{ text: '', link: '' }],
    search: {
      enabled: false,
      indexName: '',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      '/introduction/', // add trailing slash if enabled above
      '/codeblock/',
    ],
    collapsedNav: [
      '/codeblock/', // add trailing slash if enabled above
      '/linux/',
    ],
    links: [
      // { text: '', link: '' }
    ],
    frontline: false,
    ignoreIndex: true,
    title: null, //"<div class='greenCircle'></div>",
  },
  siteMetadata: {
    title: 'Artembo\' Cheat Sheet Collection',
    description: 'Мои личные заметки по технологиям. Just for fun 🤗',
    ogImage: null,
    docsLocation: 'https://github.com/artembo/artembo.github.io/tree/main/content',
    favicon: 'https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg',
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Gatsby Gitbook Starter',
      short_name: 'GitbookStarter',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;
