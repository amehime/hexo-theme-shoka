'use strict';

var fs = require('hexo-fs');

const prepareQuery = (categories, parent) => {
  const query = {};

  if (parent) {
    query.parent = parent;
  } else {
    query.parent = {$exists: false};
  }

  return categories.find(query).sort('name', 1).filter(cat => cat.length);
};

hexo.extend.helper.register('_list_categories', function(depth = 0) {
  let hexo = this;
  let categories = hexo.site.categories;

  if (!categories || !categories.length) return '';


  const hierarchicalList = (level, parent) => {
    let result = '';

    prepareQuery(categories, parent).forEach((cat, i) => {
      let child;

      if (level + 1 < depth) {
        child = hierarchicalList(level + 1, cat._id);
      }

      let catname = `<a itemprop="url" href="${hexo.url_for(cat.path)}">${cat.name}</a><small>( ${cat.length} )</small>`;

      switch(level) {
        case 0:
          result += `<div><h2 class="item header">${catname}</h2>`;
          break;

        case 1:
          result += `<h3 class="item section">${catname}</h3>`;
          break;

        case 2:
          result += `<div class="item normal"><div class="title">${catname}</div></div>`;
          break;
      }

      if (child) {
        result += `${child}`;
      }

      if(level === 0) {
        result += '</div>';
      }
    });

    return result;
  };

  return hierarchicalList(0);
});

hexo.extend.helper.register('_categories', function() {
  let hexo = this;
  let categories = hexo.site.categories;
  if (!categories || !categories.length) return '';

  var pangu = hexo.theme.pangu ? require('pangu') : {
    spacing: data => {
      return data;
    }
  };


  let result = {};

  categories.forEach((cat, i) => {
    let child = prepareQuery(categories, cat._id);
    let cover = 'source/_posts' + cat.path.replace(hexo.config.category_dir, '') + 'cover.jpg'

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
      category.posts.sort('date', 1).forEach((post) => {
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
