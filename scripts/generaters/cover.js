'use strict';

var fs = require('hexo-fs');


hexo.extend.generator.register('cover', function (locals) {
  let result = [];
  let categories = locals.categories;

  categories.forEach((cat, i) => {
    let cover = 'source/_posts/' + cat.path + 'cover.jpg'

    fs.exists(cover, function(exist) {
      if (exist) {
        result.push({
            path: cat.path + 'cover.jpg',
            data: function () {
              return fs.createReadStream(cover)
            }
          })
      }
    })

  })

  return result;

});
