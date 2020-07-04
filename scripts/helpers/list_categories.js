'use strict';

var fs = require('hexo-fs');

hexo.extend.helper.register('_categories', function() {
  let hexo = this;
  let categories = hexo.site.categories;
  if (!categories || !categories.length) return '';

  var pangu = hexo.theme.pangu ? require('pangu') : {
    spacing: data => {
      return data;
    }
  };

  const prepareQuery = parent => {
    const query = {};

    if (parent) {
      query.parent = parent;
    } else {
      query.parent = {$exists: false};
    }

    return categories.find(query).sort('name', 1).filter(cat => cat.length);
  };

  let result = {};

  categories.forEach((cat, i) => {
    let child = prepareQuery(cat._id);
    let cover = 'source/_posts/' + cat.path + 'cover.jpg'

    if (fs.existsSync(cover)) {
      let className = cat.slug.split('/');
      className.pop()
      cat.class = className.join(' ');
      cat.name = pangu.spacing(cat.name);

      if (child.length != 0) {
        cat.child = child;
      }

      result[cat._id] = cat;
    }

  })

  return result;
});

hexo.extend.helper.register('_category_prev', function(name) {
  let hexo = this;
  let categories = hexo.site.categories;
  if (!categories || !categories.length) return '';

  let result = '';

  categories.find({name}).forEach((current) => {
    if(current.parent) {
      categories.find({_id: current.parent}).forEach((cat, i) => {
        result += `<a href="${hexo.url_for(cat.path)}">${cat.name}</a>`;
      })
    }
  })

  return result;
});


hexo.extend.helper.register('_category_posts', function(page) {
  let hexo = this;
  let categories = hexo.site.categories;
  if (!categories || !categories.length || !page.categories || !page.categories.length) return '';

  let result = '';
  let cat = page.categories.toArray()

  categories.find({_id: cat[cat.length - 1]._id}).forEach((category) => {

    if(category.posts) {
      category.posts.sort('title', 1).forEach((post) => {
        var current = '';
        if(post.path == page.path) {
          current = ' class="active"';
        }
        result += `<li${current}><a href="${hexo.url_for(post.path)}" rel="bookmark" title="${post.title}">${post.title}</a></li>`;
      })
    }
  })

  return result;
});
