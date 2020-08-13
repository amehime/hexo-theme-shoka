'use strict';

var fs = require('hexo-fs');


hexo.extend.generator.register('cover', function (locals) {
  let result = [];
  let categories = locals.categories;

  categories.forEach((cat, i) => {
    let cover_path = cat.path
    if (cat.path.startsWith('/')) {
      cover_path = cat.path.substr(1)
    }

    cover_path  = cover_path + 'cover.jpg'

    let cover = 'source/_posts/' + cover_path

    if (fs.existsSync(cover)) {
      result.push({
          path: cover_path,
          data: function () {
            return fs.createReadStream(cover)
          }
        })
    }

  })

  return result;

});
