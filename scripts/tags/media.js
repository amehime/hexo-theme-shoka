
/* global hexo */

'use strict';
const yaml = require('js-yaml');
function postMedia(args, content) {
  if(!args[0] || !content) {
    return
  }
  const list = yaml.load(content);
  switch(args[0]) {
    case 'video':
    case 'audio':
      return `<div class="media-container"><div class="player" data-type="${args[0]}" data-src='${JSON.stringify(list)}'></div></div>`;
      break;
  }

}

hexo.extend.tag.register('media', postMedia, {ends: true});

//   return `<video src="${args}" preload="metadata" controls playsinline poster="">Sorry, your browser does not support the video tag.</video>`;
