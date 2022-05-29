/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mainSidebar: [
    'overview',
    'seq',
    'create',
    'equality',
    'finalize',
    {
      type: 'category',
      label: 'Predefined Functions',
      items: [
        'api/generators/api-generators',
        'api/to/api-to',
        'api/operators/api-operators',
        'api/values/api-values'
      ],
    },
  ],
};

module.exports = sidebars;
