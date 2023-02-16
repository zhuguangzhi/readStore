import { defineConfig } from '@umijs/max';
import { resolve } from 'path';
import { routes } from './src/router';

export default defineConfig({
  title: '看点小故事',
  antd: {},
  dva: {},
  alias: {
    '@': resolve(__dirname, '/src'),
  },
  metas: [
    {
      httpEquiv: 'Cache-Control',
      content: 'no-cache',
    },
    {
      httpEquiv: 'Pragma',
      content: 'no-cache',
    },
    {
      httpEquiv: 'Expires',
      content: '0',
    },
  ],
  layout: false,
  npmClient: 'yarn',
  hash: true,
  history: {
    type: 'browser',
  },
  scripts: [
    '//at.alicdn.com/t/c/font_3753867_785f9lx5t3u.js', //阿里图标库
  ],
  // proxy: {
  //   '/proxy': {
  //     target: 'http://apipost.datangzww.com',
  //     changeOrigin: true,
  //     pathRewrite: { '^/proxy': '' },
  //   },
  // },
  routes: routes,
});
