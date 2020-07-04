/* global hexo */

'use strict';

hexo.extend.filter.register('after_post_render', data => {
  const { config } = hexo;
  const theme = hexo.theme.config;

  data.content = data.content.replace(/(<img[^>]*) src=/img, '$1 data-src=');

  const url = require('url');
  const siteHost = url.parse(config.url).hostname || config.url;
  data.content = data.content.replace(/<a[^>]* href="([^"]+)"[^>]*>([^<]*)<\/a>/img, (match, href, html) => {
    // Exit if the href attribute doesn't exists.
    if (!href) return match;

    // Exit if the url has same host with `config.url`, which means it's an internal link.
    let link = url.parse(href);
    if (!link.protocol || link.hostname === siteHost) return match;

    return `<span class="exturl" data-url="${Buffer.from(href).toString('base64')}">${html}</span>`;
  });

}, 0);
