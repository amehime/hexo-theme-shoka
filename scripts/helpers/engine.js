/* global hexo */

'use strict';

const { htmlTag, url_for } = require('hexo-util');
const url = require('url');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const randomServer = parseInt(Math.random()*4,10)+1

const randomBG = function(count = 1, image_server = null, image_list = []) {
  if (image_server) {
    if(count && count > 1) {
      var arr = new Array(count);
      for(var i=0; i < arr.length; i++){
        arr[i] = image_server + '?' + Math.floor(Math.random() * 999999)
      }

      return arr;
    }

    return image_server + '?' + Math.floor(Math.random() * 999999)
  }

  var parseImage = function(img, size) {
    if (img.startsWith('//') || img.startsWith('http')) {
      return img
    } else {
      return 'https://tva'+randomServer+'.sinaimg.cn/'+size+'/'+img
    }
  }

  if(count && count > 1) {
    var shuffled = image_list.slice(0), i = image_list.length, min = i - count, temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }

    return shuffled.slice(min).map(function(img) {
      return parseImage(img, 'large')
    });
  }

  return parseImage(image_list[Math.floor(Math.random() * image_list.length)], 'mw690')
}

hexo.extend.helper.register('_url', function(path, text, options = {}) {
  if(!path)
    return

  const { config } = this;
  const data = url.parse(path);
  const siteHost = url.parse(config.url).hostname || config.url;

  const theme = hexo.theme.config;
  let exturl = '';
  let tag = 'a';
  let attrs = { href: url_for.call(this, path) };

  // If `exturl` enabled, set spanned links only on external links.
  if (theme.exturl && data.protocol && data.hostname !== siteHost) {
    tag = 'span';
    exturl = 'exturl';
    const encoded = Buffer.from(path).toString('base64');
    attrs = {
      class     : exturl,
      'data-url': encoded
    };
  }

  for (let key in options) {

    /**
     * If option have `class` attribute, add it to
     * 'exturl' class if `exturl` option enabled.
     */
    if (exturl !== '' && key === 'class') {
      attrs[key] += ' ' + options[key];
    } else {
      attrs[key] = options[key];
    }
  }

  if (attrs.class && Array.isArray(attrs.class)) {
    attrs.class = attrs.class.join(' ');
  }

  // If it's external link, rewrite attributes.
  if (data.protocol && data.hostname !== siteHost) {
    attrs.external = null;

    if (!theme.exturl) {
      // Only for simple link need to rewrite/add attributes.
      attrs.rel = 'noopener';
      attrs.target = '_blank';
    } else {
      // Remove rel attributes for `exturl` in main menu.
      attrs.rel = null;
    }
  }

  return htmlTag(tag, attrs, decodeURI(text), false);
});

hexo.extend.helper.register('_image_url', function(img, path = '') {
  const { statics } = hexo.theme.config;
  const { post_asset_folder } = hexo.config;

  if (img.startsWith('//') || img.startsWith('http')) {
    return img
  } else {
    return url_for.call(this, statics + (post_asset_folder ? path : '') + img)
  }
})

hexo.extend.helper.register('_cover', function(item, num) {
  const { statics, js, image_server, image_list } = hexo.theme.config;

  if(item.cover) {
    return this._image_url(item.cover, item.path)
  } else if (item.photos && item.photos.length > 0) {
    return this._image_url(item.photos[0], item.path)
  } else {
    return randomBG(num || 1, image_server, image_list);
  }

})

hexo.extend.helper.register('_md5', function(path) {
  let str = url_for.call(this, path);
  str.replace('index.html', '');
  return crypto.createHash('md5').update(str).digest('hex');
});

hexo.extend.helper.register('_permapath', function(str) {
  // https://support.google.com/webmasters/answer/139066
  const { permalink } = hexo.config;
  let url = str.replace(/index\.html$/, '');
  if (!permalink.endsWith('.html')) {
    url = url.replace(/\.html$/, '');
  }
  return url;
});

hexo.extend.helper.register('canonical', function() {
  return `<link rel="canonical" href="${this._permapath(this.url)}">`;
});

/**
 * Get page path given a certain language tag
 */
hexo.extend.helper.register('i18n_path', function(language) {
  const { path, lang } = this.page;
  const base = path.startsWith(lang) ? path.slice(lang.length + 1) : path;
  return url_for.call(this, `${this.languages.indexOf(language) === 0 ? '' : '/' + language}/${base}`);
});

/**
 * Get the language name
 */
hexo.extend.helper.register('language_name', function(language) {
  const name = hexo.theme.i18n.__(language)('name');
  return name === 'name' ? language : name;
});
