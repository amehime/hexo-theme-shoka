/* global hexo */

/*
{% links %}
- site: #main title
  owner: #alternate title for image tooltip (nullable)
  url: #link of site
  desc: #description (nullable)
  image: #icon image (nullable)
  color: #block color (nullable)
{% endlinks %}

{% linksfile [path] %}
*/

'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const url = require('url');

function linkGrid(args, content) {
  const theme = hexo.theme.config;

  if(!args[0] && !content) {
    return
  }

  if(args[0]) {
    const filepath = path.join(hexo.source_dir, args[0]);
    if(fs.existsSync(filepath)) {
      content = fs.readFileSync(filepath);
    }
  }

  if (!content) {
    return
  }

  const siteHost = url.parse(hexo.config.url).hostname || hexo.config.url;

  const list = yaml.load(content);

  var result = ''

  list.forEach(item => {
    if(!item.url || !item.site) {
      return;
    }

    var urlparam = {};

    if(item.url) {
      urlparam = url.parse(item.url);
    }

    var item_image = item.image || theme.images + '/404.png';

    if (!item_image.startsWith('//') && !item_image.startsWith('http')) {
      item_image = theme.statics + item_image;
    }

    item.color = item.color? ` style="--block-color:${item.color};"` : '';

    result += `<div class="item" title="${item.owner || item.site}"${item.color}>`;

    if (urlparam.protocol && urlparam.hostname !== siteHost) {
      var durl = Buffer.from(item.url).toString('base64');
      result += `<span class="exturl image" data-url="${durl}" data-background-image="${item_image}"></span>
          <div class="info">
          <span class="exturl title" data-url="${durl}">${item.site}</span>
          <p class="desc">${item.desc || item.url}</p>
          </div></div>`;
    } else {
      result += `<a href="${item.url}" class="image" data-background-image="${item_image}"></a>
          <div class="info">
          <a href="${item.url}" class="title">${item.site}</a>
          <p class="desc">${item.desc || item.url}</p>
          </div></div>`;
    }
  });

  return `<div class="links">${result}</div>`;

}

hexo.extend.tag.register('links', linkGrid, {ends: true});
hexo.extend.tag.register('linksfile', linkGrid, {ends: false, async: true})
