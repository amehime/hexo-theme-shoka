'use strict';

var fs = require('hexo-fs');


hexo.extend.generator.register('cover', function (locals) {
  const config = this.config;
  let result = [];
  let categories = locals.categories;

  categories.forEach((cat, i) => {
    let cover_path = cat.path.replace(config.category_dir, '') + 'cover.jpg';

    let cover = 'source/_posts' + cover_path

    if (fs.existsSync(cover)) {
      result.push({
          path: cat.path + 'cover.jpg',
          data: function () {
            return fs.createReadStream(cover)
          }
        })
    }

  })

  return result;

});
