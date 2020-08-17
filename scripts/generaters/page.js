'use strict';

hexo.extend.generator.register('page', function(locals){
  const config = this.theme.config;

  return [
    {
      path: config.page.categories + '/index.html',
      data: {type: 'categories'},
      layout: ['page']
    },
    {
      path: config.page.tags + '/index.html',
      data: {type: 'tags'},
      layout: ['page']
    },
    {
      path: '404.html',
      data: {type: '404'},
      layout: ['page']
    }
  ]
});
