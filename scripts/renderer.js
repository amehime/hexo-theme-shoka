/* global hexo */

'use strict';

const nunjucks = require('nunjucks');
const path = require('path');

function njkCompile(data) {
  const templateDir = path.dirname(data.path);
  const env = nunjucks.configure(templateDir, {
    autoescape: false
  });
  env.addFilter('safedump', dictionary => {
    if (typeof dictionary !== 'undefined' && dictionary !== null) {
      return JSON.stringify(dictionary);
    }
    return '""';
  });
  return nunjucks.compile(data.text, env, data.path);
}

function njkRenderer(data, locals) {
  return njkCompile(data).render(locals);
}

// Return a compiled renderer.
njkRenderer.compile = function(data) {
  const compiledTemplate = njkCompile(data);
  // Need a closure to keep the compiled template.
  return function(locals) {
    return compiledTemplate.render(locals);
  };
};

hexo.extend.renderer.register('njk', 'html', njkRenderer);

const url = require('url');

hexo.extend.renderer.register('js', 'js', function(data, options){
  const config = hexo.config;
  const theme = hexo.theme.config;

  var siteConfig = {
    hostname  : url.parse(config.url).hostname || config.url,
    root: config.root,
    statics: theme.statics,
    favicon: {
      normal: theme.images + "/favicon.ico",
      hidden: theme.images + "/failure.ico"
    },
    js: {
      valine: theme.vendors.js.valine,
      chart: theme.vendors.js.chart,
      copy_tex: theme.vendors.js.copy_tex,
      mediumzoom: theme.vendors.js.mediumzoom
    },
    css: {
      valine: theme.css + "/comment.css",
      katex: theme.vendors.css.katex,
      mermaid: theme.css + "/mermaid.css"
    },
    search : null,
    quicklink: {
      timeout : theme.quicklink.timeout,
      priority: theme.quicklink.priority
    }
  };

  if(config.algolia) {
    siteConfig.search = {
      appID    : config.algolia.appId,
      apiKey   : config.algolia.apiKey,
      indexName: config.algolia.indexName,
      hits     : theme.search.hits
    }
  }

  return data.text
  .replace("/*CONFIG*/", JSON.stringify(siteConfig))
  .replace("/*COMMENTCONFIG*/", JSON.stringify(theme.valine));
});
