/* global hexo */

/*
{% links [image] [delimiter] [comment] %}
alternate title for image tooltip (nullable) | main title | url | description | icon image | block color
{% endlinks %}
*/

'use strict';

function linkGrid(args, content) {

  const image     = args[0] || '/images/avatar.gif';
  const delimiter = args[1] || '|';
  const comment   = args[2] || '%';

  const url = require('url');
  const siteHost = url.parse(hexo.config.url).hostname || hexo.config.url;

  const links = content.split('\n').map(item => {
    item = item.split(delimiter).map(arg => arg.trim());
    if (item[0][0] === comment) return '';
    let data = {};

    if(item[2]) {
      data = url.parse(item[2]);
    }

    if (data.protocol && data.hostname !== siteHost)  {
      item[2] = Buffer.from(item[2]).toString('base64');
      return `<div class="item" style="--block-color:${item[5] || '#666'};" title="${item[0] || item[1]}">
<span class="exturl image" data-url="${item[2]}" data-background-image="${item[4] || image}"></span>
<div class="info">
<span class="exturl title" data-url="${item[2]}">${item[1]}</span>
<p class="desc">${item[3] || item[2]}</p>
</div></div>`;
    } else  {
      return `<div class="item" style="--block-color:${item[5] || '#666'};" title="${item[0] || item[1]}">
<a href="${item[2]}" class="image" data-background-image="${item[4] || image}"></a>
<div class="info">
<a href="${item[2]}" class="title">${item[1]}</a>
<p class="desc">${item[3] || item[2]}</p>
</div></div>`;
    }

  });
  return `<div class="links">${links.join('')}</div>`;
}

hexo.extend.tag.register('links', linkGrid, {ends: true});
