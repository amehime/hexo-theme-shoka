'use strict';

const merge = require('hexo-util').deepMerge || require('lodash/merge');

hexo.on('generateBefore', function () {
  if (hexo.config.theme_config) {
    hexo.theme.config = merge(hexo.theme.config, hexo.config.theme_config);
  }
})
