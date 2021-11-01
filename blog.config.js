/**
 * @type {import('~/types').BlogConfig}
 */
const BLOG = {
  title: 'Pickyzz.ga',
  author: 'Parinya T.',
  email: 'pikcolokung@gmail.com',
  link: 'https://pickyzz.ga',
  description: 'I have computer.',
  lang: 'en-US', // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES']
  appearance: 'light', // ['light', 'dark'],
  font: 'sans-serif', // ['sans-serif', 'serif']
  lightBackground: '#ffffff', // use hex value, don't forget '#' e.g #fffefc
  darkBackground: '#0C1C33', // use hex value, don't forget '#'
  path: '', // leave this empty unless you want to deploy Nobelium in a folder
  profileSlug: 'profile',
  since: 2021, // If leave this empty, current year will be used.
  sortByDate: true,
  showAbout: true,
  showArchive: true,
  autoCollapsedNavBar: false, // The automatically collapsed navigation bar
  ogImageGenerateURL: 'https://og-image-pickyzz.vercel.app', // The link to generate OG image, don't end with a slash
  // detail: https://github.com/yokinist/og-image/blob/main/api/_lib/types.ts#L2-L12
  socialLink: 'https://twitter.com/p1ckyzz',
  seo: {
    keywords: ['pickyzz'],
    googleSiteVerification: '', // Remove the value or replace it with your own google site verification code
  },
  notionPageId: process.env.NOTION_PAGE_ID, // DO NOT CHANGE THIS！！！
  notionAccessToken: process.env.NOTION_ACCESS_TOKEN, // Useful if you prefer not to make your database public
  analytics: {
    provider: 'ga', // Currently we support Google Analytics and Ackee, please fill with 'ga' or 'ackee', leave it empty to disable it.
    ackeeConfig: {
      tracker: '', // e.g 'https://ackee.craigary.net/tracker.js'
      dataAckeeServer: '', // e.g https://ackee.craigary.net , don't end with a slash
      domainId: '', // e.g '0e2257a8-54d4-4847-91a1-0311ea48cc7b'
    },
    gaConfig: {
      measurementId: 'G-F0LYXZGWQ6', // e.g: G-XXXXXXXXXX
    },
  },
  comment: {
    // support provider: gitalk, utterances, cusdis
    provider: 'gitalk', // leave it empty if you don't need any comment plugin
    gitalkConfig: {
      repo: 'pickyzz-blog-comment', // The repository of store comments
      owner: 'pickyzz',
      clientID: '3ef04e5fe6e60690cc70',
      clientSecret: process.env.GITALK_CLIENT_SECRET,
      admin: ['pickyzz'],
      id: 'pickyzz.ga', // Ensure uniqueness and length less than 50
      distractionFreeMode: true,
    },
    utterancesConfig: {
      repo: '',
    },
    cusdisConfig: {
      appId: '4c9aa1e3-623a-4773-a9ef-f345f484efe5', // data-app-id'
      host: 'https://cusdis.com', // data-host, change this if you're using self-hosted version
      scriptSrc: 'https://cusdis.com/js/cusdis.es.js', // change this if you're using self-hosted version
    },
  },
  isProd: process.env.VERCEL_ENV === 'production', // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
};
// export default BLOG
module.exports = BLOG;
