'use strict';

const pagination = require('hexo-pagination');

hexo.config.index_generator = Object.assign({
  per_page: typeof hexo.config.per_page === 'undefined' ? 10 : hexo.config.per_page,
  order_by: '-date'
}, hexo.config.index_generator);

hexo.extend.generator.register('index', function(locals) {
  const config = this.config;
  const theme = this.theme.config;
  const posts = locals.posts.sort(config.index_generator.order_by);
  const paginationDir = config.pagination_dir || 'page';
  const path = config.index_generator.path || '';

  const categories = locals.categories;

  if (theme.index.mode == 'category' && categories && categories.length) {
    return {
      path,
      layout: ['index', 'archive'],
      data: {
        __index: true
      }
    };
  }

  return pagination(path, posts, {
    perPage: config.index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });

});
