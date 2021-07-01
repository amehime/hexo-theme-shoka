/* global hexo */

'use strict';

hexo.extend.filter.register('after_post_render', data => {
  const { config } = hexo;
  const theme = hexo.theme.config;

  data.content = data.content.replace(/(<img[^>]*) src=/img, '$1 data-src=');

  const url = require('url');
  const siteHost = url.parse(config.url).hostname || config.url;
  data.content = data.content.replace(/<a[^>]* ((?:href)|(?:title))="([^"]+)"[^>]* ((?:href)|(?:title))="([^"]+)"[^>]*>([^<]*)<\/a>/img, (match, attr1, str1, attr2, str2, html) => {
    let href = attr1 === 'href' ? str1 : str2;
    let title = attr1 === 'title' ? str1 : str2;

    // Exit if the url has same host with `config.url`, which means it's an internal link.
    let link = url.parse(href);
    if (!link.protocol || link.hostname === siteHost) return match;

    return `<span class="exturl" data-url="${Buffer.from(href).toString('base64')}" title="${title}">${html}</span>`;

  });

}, 0);
