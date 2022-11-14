import { defineConfig } from '@umijs/max';
import { resolve } from 'path';
import { routes } from './src/router';

export default defineConfig({
  title: '读点小故事',
  antd: {},
  alias: {
    '@': resolve(__dirname, '/src'),
  },
  layout: false,
  npmClient: 'yarn',
  history: {
    type: 'hash',
  },
  scripts: [
    '//at.alicdn.com/t/c/font_3754033_1bm5q8qg2fq.js', //阿里图标库
  ],
  routes: routes,
});
