'use strict';

const fs = require('hexo-fs');

hexo.extend.generator.register('images', function(locals){
  const config = hexo.config;
  const theme = hexo.theme.config;
  const dir = 'source/_data/' + theme.images + '/'

  if(!fs.existsSync(dir))
    return

  var result = []
  var files = fs.listDirSync(dir)

  files.forEach(file => {
    result.push({
      path: theme.images + '/' + file,
      data: function () {
        return fs.createReadStream(dir + file)
      }
    });
  })

  return result;
});
