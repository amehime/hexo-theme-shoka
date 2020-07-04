/* global hexo */

'use strict';

hexo.extend.helper.register('_vendor_font', () => {
  const config = hexo.theme.config.font;

  if (!config || !config.enable) return '';

  const fontDisplay = '&display=swap';
  const fontSubset = '&subset=latin,latin-ext';
  const fontStyles = ':300,300italic,400,400italic,700,700italic';
  const fontHost = '//fonts.googleapis.com';

  //Get a font list from config
  let fontFamilies = ['global', 'title', 'headings', 'posts', 'codes'].map(item => {
    if (config[item] && config[item].family && config[item].external) {
      return config[item].family + fontStyles;
    }
    return '';
  });

  fontFamilies = fontFamilies.filter(item => item !== '');
  fontFamilies = [...new Set(fontFamilies)];
  fontFamilies = fontFamilies.join('|');

  // Merge extra parameters to the final processed font string
  return fontFamilies ? `<link rel="stylesheet" href="${fontHost}/css?family=${fontFamilies.concat(fontDisplay, fontSubset)}">` : '';
});


hexo.extend.helper.register('_vendor_js', () => {
  const config = hexo.theme.config.vendors.js;

  if (!config) return '';

  //Get a font list from config
  let vendorJs = ['pace', 'pjax', 'velocity', 'velocity_ui', 'algolia', 'instantsearch', 'lazyload', 'quicklink'].map(item => {
    if (config[item]) {
      return config[item];
    }
    return '';
  });

  vendorJs = vendorJs.filter(item => item !== '');
  vendorJs = [...new Set(vendorJs)];
  vendorJs = vendorJs.join(',');

  let result = vendorJs ? `<script src="//cdn.jsdelivr.net/combine/${vendorJs}"></script>` : '';

  return result;
});

