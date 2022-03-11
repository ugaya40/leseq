// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const leseqApisConfigBase = (kind) => ({
  id: `api-${kind}`,
  out: `api/${kind}`,
  entryPoints: [`../leseq/src/${kind}/index.ts`],
  tsconfig: '../leseq/tsconfig.json',
  categorizeByGroup: false,
  hideBreadcrumbs: true,
  hideInPageTOC: true,
  readme: 'none',
  sidebar: {
    categoryLabel: `api`,
  },
  frontmatter: {
    id: `api-${kind}`,
    title: `${kind}`,
    hide_title: true,
    sidebar_label: `${kind}`,
  }
});

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'leseq',
  tagline: 'Lazy evaluation list with high tree-shaking affinity and easy customization.',
  url: 'https://ugaya40.github.io/',
  baseUrl: '/leseq/',
  trailingSlash: true,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  organizationName: 'ugaya40', // Usually your GitHub org/user name.
  projectName: 'leseq', // Usually your repo name.

  plugins:[
    [
      'docusaurus-plugin-typedoc',
      {
        ...leseqApisConfigBase('generators'),
        categoryOrder: ['Generators', 'Async Generators']
      }
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        ...leseqApisConfigBase('operators'),
        categoryOrder: ['Operators', 'Async Operators']
      }
      
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        ...leseqApisConfigBase('values'),
        categoryOrder: ['Values', 'Async Values']
      }
    ]
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarCollapsed: false,
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'UA-55248908-3',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'leseq',
        items: [
          {
            href: 'https://stackblitz.com/edit/typescript-vygaa6?file=index.ts',
            label: 'Live Demo',
            position: 'right',
          },
          {
            href: 'https://github.com/ugaya40/leseq',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
