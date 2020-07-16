Object.assign(HTMLElement.prototype, {
  wrap: function (wrapper) {
    this.parentNode.insertBefore(wrapper, this);
    this.parentNode.removeChild(this);
    wrapper.appendChild(this);
  },
  height: function() {
    return this.getBoundingClientRect().height
  },
  top: function() {
    return this.getBoundingClientRect().top
  },
  attr: function(type, value) {
    if(value) {
      return this.setAttribute(type, value)
    } else {
      return this.getAttribute(type)
    }
  }
});

const $ = function(selector) {
  if(selector.indexOf('#') > 0) {
    return document.getElementById(selector.replace('#', ''))
  }
  return document.querySelector(selector)
};

$.all = function(selector) {
  return document.querySelectorAll(selector)
};

$.each = function(selector, callback) {
  return $.all(selector).forEach(callback)
}

const getRndInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var statics = CONFIG.statics.indexOf('//') > 0 ? CONFIG.statics : CONFIG.root
var scrollAction = { x: 'undefined', y: 'undefined' };
var diffY = 0;
var originTitle, titleTime;

const Container = $('body > .container');
const siteNav = $('.container > header nav');
const siteNavHeight = siteNav.height();
const siteHeader = $('.container > header');
const headerHight = siteHeader.height();
const headerHightInner = headerHight - siteNavHeight;
const backToTop = $('.back-to-top');
const metaBox = $('.container > header .brand .meta');
const sideBar = $('main .sidebar');

const getDocHeight = function () {
  return $('main > .inner').offsetHeight;
}

const resizeHandle = function (event) {
  var docHeight = getDocHeight();
  if (docHeight > document.body.offsetHeight) {
    $('.sidebar .quick').style.display = 'flex';
    $('.sidebar .panels').style.height = '100vh';
  } else {
    $('.sidebar .quick').style.display = 'none';
  }

  $.each('pre.code span.marked', function(element) {
    element.style.width = null
    setTimeout(function () {
        element.style.width = element.parentNode.scrollWidth - 1 + "px";
      }, 300);
  });
}

const scrollHandle = function (event) {
  var winHeight = window.innerHeight;
  var docHeight = getDocHeight();
  var contentVisibilityHeight = docHeight > winHeight ? docHeight - winHeight : document.body.scrollHeight - winHeight;
  var SHOW = window.pageYOffset > headerHightInner;

  if (SHOW) {
    $('meta[name="theme-color"]').setAttribute('content',  '#FFF');
  } else {
    $('meta[name="theme-color"]').setAttribute('content',  '#222');
  }

  siteNav.classList.toggle('show', SHOW);
  metaBox.classList.toggle('affix', window.pageYOffset > 0);
  sideBar.classList.toggle('affix', SHOW && document.body.offsetWidth > 991);

  if (typeof scrollAction.y == 'undefined') {
    scrollAction.y = window.pageYOffset;
    //scrollAction.x = Container.scrollLeft;
    //scrollAction.y = Container.scrollTop;
  }
  //var diffX = scrollAction.x - Container.scrollLeft;
  diffY = scrollAction.y - window.pageYOffset;

  //if (diffX < 0) {
  // Scroll right
  //} else if (diffX > 0) {
  // Scroll left
  //} else
  if (diffY < 0) {
    // Scroll down
    siteNav.classList.remove('up')
    siteNav.classList.toggle('down', SHOW);
  } else if (diffY > 0) {
    // Scroll up
    siteNav.classList.remove('down')
    siteNav.classList.toggle('up', SHOW);
  } else {
    // First scroll event
  }
  //scrollAction.x = Container.scrollLeft;
  scrollAction.y = window.pageYOffset;

  var scrollPercent = Math.round(Math.min(100 * window.pageYOffset / contentVisibilityHeight, 100)) + '%';
  backToTop.querySelector('span').innerText = scrollPercent;
  $('.percent').style.width = scrollPercent;
}

const sideBarToggleHandle = function (event) {
  $('.toggle.menu').classList.toggle('close');
  var animateAction = sideBar.classList.contains('on') ? 'transition.slideRightOut' : 'transition.slideRightIn';
  Velocity(sideBar, animateAction, {
    duration: 200,
    complete: function () {
      sideBar.classList.toggle('on');
    }
  });
}

const menuActive = function () {
  $.each('.menu .item', function (element) {
    var target = element.querySelector('a[href]');
    if (!target) return;
    var isSamePath = target.pathname === location.pathname || target.pathname === location.pathname.replace('index.html', '');
    var isSubPath = !CONFIG.root.startsWith(target.pathname) && location.pathname.startsWith(target.pathname);
    element.classList.toggle('active', target.hostname === location.hostname && (isSamePath || isSubPath));
  });
}

const sideBarTab = function () {
  var sideBarInner = $('.sidebar .inner');
  var panels = $.all('.sidebar .panel');

  if($('.sidebar ul.tab')) {
    sideBarInner.removeChild($('.sidebar ul.tab'));
  }

  var list = document.createElement('ul'), active = 'active';
  list.className = 'tab';

  ['contents', 'related', 'overview'].forEach(function (item) {
    var element = $('.sidebar .panel.' + item)

    if(element.innerHTML.replace(/(^\s*)|(\s*$)/g, "").length < 1) {
      return;
    }
    var tab = document.createElement('li');
    var span = document.createElement('span')
    var text = document.createTextNode(element.attr('data-title'));
    span.appendChild(text);
    tab.appendChild(span);
    tab.classList.add(item);

    if(active) {
      element.classList.add(active);
      tab.classList.add(active);
    } else {
      element.classList.remove('active');
    }

    tab.addEventListener('click', function (element) {
      var target = event.currentTarget;
      if (target.classList.contains('active'))
        return;

      $.each('.sidebar .tab li', function (element) {
        element.classList.remove('active')
      });

      $.each('.sidebar .panel', function (element) {
        element.classList.remove('active')
      });


      $('.sidebar .panel.' + target.className ).classList.add('active');
      Velocity($('.sidebar .panels > .inner'), "finish");
      Velocity($('.sidebar .panels > .inner'), "transition.slideUpBigIn");

      target.classList.add('active');
    });

    list.appendChild(tab);
    active = '';
  });

  if (list.childNodes.length > 1) {
    sideBarInner.insertBefore(list, sideBarInner.childNodes[0]);
    $('.sidebar .panels').style.paddingTop = ''
  } else {
    $('.sidebar .panels').style.paddingTop = '10px'
  }
}

const sidebarTOC = function () {
  var navItems = $.all('.contents li');

  if (navItems.length < 1) {
    return;
  }

  var sections = Array.prototype.slice.call(navItems) || [];
  var activeLock = null;

  sections = sections.map(function (element, index) {
    var link = element.querySelector('a.toc-link');
    var clickScroll = function (event) {
      event.preventDefault();
      var target = $(event.currentTarget.attr('href'));
      activeLock = index;
      pageScroll(window.pageYOffset + target.top() - target.height() - headerHightInner - siteNavHeight,
        function() {
          activateNavByIndex(index)
          activeLock = null
        });
    };

    // TOC item animation navigate.
    link.addEventListener('click', clickScroll);
    $(link.attr('href')).querySelector('a.anchor').addEventListener('click', clickScroll);
    return $(link.attr('href'));
  });

  var tocElement = $('.sidebar .panels .inner');

  var activateNavByIndex = function (index, lock) {
    var target = navItems[index]

    if (!target)
      return;

    if (target.classList.contains('current')) {
      return;
    }

    $.each('.toc .active', function (element) {
      element.classList.remove('active', 'current');
    });

    sections.forEach(function (element) {
      element.classList.remove('active');
    });

    target.classList.add('active', 'current');
    sections[index].classList.add('active');

    var parent = target.parentNode;

    while (!parent.matches('.contents')) {
      if (parent.matches('li')) {
        parent.classList.add('active');
        var t = $(parent.querySelector('a.toc-link').attr('href'))
        if(t) {
          t.classList.add('active');
        }
      }
      parent = parent.parentNode;
    }
    // Scrolling to center active TOC element if TOC content is taller then viewport.
    Velocity(target, "scroll", {
      container: tocElement,
      offset: - (tocElement.offsetHeight / 2)
    });
  }

  var findIndex = function(entries) {
    var index = 0;
    var entry = entries[index];

    if (entry.boundingClientRect.top > 0) {
      index = sections.indexOf(entry.target);
      return index === 0 ? 0 : index - 1;
    }
    for (; index < entries.length; index++) {
      if (entries[index].boundingClientRect.top <= 0) {
        entry = entries[index];
      } else {
        return sections.indexOf(entry.target);
      }
    }
    return sections.indexOf(entry.target);
  }

  var createIntersectionObserver = function() {
    var observer = new IntersectionObserver(function (entries, observe) {
      var index = findIndex(entries) + (diffY < 0? 1 : 0);
      if(activeLock === null) {
        activateNavByIndex(index);
      }
    }, {
      rootMargin: '0px 0px -100% 0px',
      threshold: 0
    });

    sections.forEach(function (element) {
      element && observer.observe(element);
    });

  }

  createIntersectionObserver();
}

const postBeauty = function () {

  if($('.post .body :not(a) > img, .post .body > img')) {
    vendorJs('mediumzoom', function() {
        window.mediumZoom('.post .body :not(a) > img, .post .body > img', {
          background: 'rgba(0, 0, 0, 0.6)'
        });
      }, window.mediumZoom);
  }

  $.each('li ruby', function(element) {
    var parent = element.parentNode;
    if(element.parentNode.tagName != 'LI') {
      parent = element.parentNode.parentNode;
    }
    parent.classList.add('ruby');
  })

  $.each('figure.highlight', function (element) {
    const caption = element.querySelector('figcaption');
    var code_container = element.querySelector('.code-container');

    if (caption) {
      caption.insertAdjacentHTML('afterBegin', '<div class="carbon"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>');
    }

    if(code_container.height() > 300) {
      code_container.style.maxHeight = "300px";
      code_container.insertAdjacentHTML('beforeend', '<div class="show-btn"><i class="ic i-angle-down up-down"></i></div>');
      var showBtn = code_container.querySelector('.show-btn');
      var showBtnIcon = showBtn.querySelector('i');
      showBtn.addEventListener('click', function(event) {
        if (showBtn.classList.contains('open')) {
          code_container.style.maxHeight = "300px"
          showBtn.classList.remove('open')
          showBtnIcon.classList.add('i-angle-down')
          showBtnIcon.classList.remove('i-angle-up')
          Velocity(code_container.parentNode, "scroll");
        } else {
          code_container.style.maxHeight = ""
          showBtn.classList.add('open')
          showBtnIcon.classList.remove('i-angle-down')
          showBtnIcon.classList.add('i-angle-up')
        }
      });
    }

    element.insertAdjacentHTML('beforeend', '<div class="copy-btn"><i class="ic i-clipboard fa-fw"></i></div>');
    var copyBtn = element.querySelector('.copy-btn');
    copyBtn.addEventListener('click', function (event) {
      var target = event.currentTarget;
      var code = target.parentNode.querySelector('pre.code').innerText;
      var ta = document.createElement('textarea');
      ta.style.top = window.scrollY + 'px'; // Prevent page scrolling
      ta.style.position = 'absolute';
      ta.style.opacity = '0';
      ta.readOnly = true;
      ta.value = code;
      document.body.append(ta);
      const selection = document.getSelection();
      const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false;
      ta.select();
      ta.setSelectionRange(0, code.length);
      ta.readOnly = false;
      var result = document.execCommand('copy');

      target.querySelector('i').className = result ? 'ic i-check' : 'ic i-times';
      ta.blur(); // For iOS
      target.blur();
      if (selected) {
        selection.removeAllRanges();
        selection.addRange(selected);
      }
      document.body.removeChild(ta);
    });
    copyBtn.addEventListener('mouseleave', function (event) {
      setTimeout(function () {
        event.target.querySelector('i').className = 'ic i-clipboard';
      }, 300);
    });
  });

  $.each('table', function (element) {
    const box = document.createElement('div');
    box.className = 'table-container';
    element.wrap(box);
  });

  $.each('pre.mermaid > svg', function (element) {
    element.style.maxWidth = ''
  });

  $.each('.reward button', function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      var qr = $('#qr')
      if(qr.style.display === 'inline-flex') {
        Velocity(qr, "fadeOut");
      } else {
        Velocity(qr, "transition.slideUpBigIn", {display: 'inline-flex'});
      }
    });
  });

  //quiz
  $.each('.quiz > ul.options li', function (element) {
    element.addEventListener('click', function (event) {
      if (element.classList.contains('correct')) {
        element.classList.toggle('right')
        element.parentNode.parentNode.classList.add('show')
      } else {
        element.classList.toggle('wrong')
      }
    });
  });

  $.each('.quiz > p', function (element) {
    element.addEventListener('click', function (event) {
      element.parentNode.classList.toggle('show')
    });
  });

  loadComments();
}

const pageScroll = function (height, complete) {
  Velocity($('main .content'), "scroll", {
    duration: 500,
    //container: Container,
    offset: height,
    complete: complete || function() {}
  });
}

const backToTopHandle = function () {
  pageScroll(-headerHight)
}

const goToBottomHandle = function () {
  pageScroll(getDocHeight() + $('.container > footer').offsetHeight)
}

const getScript = function(url, callback, condition) {
  if (condition) {
    callback();
  } else {
    var script = document.createElement('script');
    script.onload = script.onreadystatechange = function(_, isAbort) {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = script.onreadystatechange = null;
        script = undefined;
        if (!isAbort && callback) setTimeout(callback, 0);
      }
    };
    script.src = url;
    document.head.appendChild(script);
  }
}

const assetUrl = function(type) {
  return (CONFIG[type].indexOf('npm')>-1? "//cdn.jsdelivr.net/":statics)+CONFIG[type];
}

const vendorJs = function(type, callback, condition) {
  if(CONFIG[type]) {
    getScript(assetUrl(type), callback || function(){
      window[type] = true;
    }, condition || window[type]);
  }
}

const vendorCss = function(type, condition) {
  if(window[type])
    return;

  if(CONFIG[type]) {
    var linkTag = document.createElement('link');
    linkTag.setAttribute('rel','stylesheet');
    linkTag.href = assetUrl(type);

    document.head.appendChild(linkTag);

    window[type] = true;
  }
}

const loadComments = function () {
  var element = $('#comments');
  if (!element) {
    return;
  }

  var intersectionObserver = new IntersectionObserver(function(entries, observer) {
    vendorJs('valine', function() {
      var entry = entries[0];
      if (entry.isIntersecting) {
        var options = CONFIG.comments;
        options.el = '#comments';
        options.path = element.attr('data-id');

        new Valine(options);

        Velocity($('#comments'), 'transition.bounceUpIn');

        observer.disconnect();
      }
    }, window.Valine);
  });

  intersectionObserver.observe(element);
}

const pagePostion = function(url) {
  window.sessionStorage.setItem(url, scrollAction.y - headerHightInner - siteNavHeight)
}

const algoliaSearch = function(pjax) {
  var search = instantsearch({
    indexName: CONFIG.search.indexName,
    searchClient  : algoliasearch(CONFIG.search.appID, CONFIG.search.apiKey),
    searchFunction: function(helper) {
      var searchInput = $('.search-input');
      if (searchInput.value) {
        helper.search();
      }
    }
  });

  search.on('render', function() {
    pjax.refresh($('#search-hits'));
  });

  // Registering Widgets
  search.addWidgets([
    instantsearch.widgets.configure({
      hitsPerPage: CONFIG.search.hits.per_page || 10
    }),

    instantsearch.widgets.searchBox({
      container           : '.search-input-container',
      placeholder         : CONFIG.search.labels.input_placeholder,
      // Hide default icons of algolia search
      showReset           : false,
      showSubmit          : false,
      showLoadingIndicator: false,
      cssClasses          : {
        input: 'search-input'
      }
    }),

    instantsearch.widgets.stats({
      container: '#search-stats',
      templates: {
        text: function(data) {
          var stats = CONFIG.search.labels.hits_stats
            .replace(/\$\{hits}/, data.nbHits)
            .replace(/\$\{time}/, data.processingTimeMS);
          return stats + '<span class="algolia-powered"></span><hr>';
        }
      }
    }),

    instantsearch.widgets.hits({
      container: '#search-hits',
      templates: {
        item: function(data) {
          var cats = data.categories.join('<i class="ic i-angle-right"></i>')
          return '<a href="' + CONFIG.root + data.path +'"><span>'+cats+'</span>'+data._highlightResult.title.value+'</a>';
        },
        empty: function(data) {
          return '<div id="hits-empty">'+
              CONFIG.search.labels.hits_empty.replace(/\$\{query}/, data.query) +
            '</div>';
        }
      },
      cssClasses: {
        item: 'item'
      }
    }),

    instantsearch.widgets.pagination({
      container: '#search-pagination',
      scrollTo : false,
      showFirst: false,
      showLast : false,
      templates: {
        first   : '<i class="ic i-angle-double-left"></i>',
        last    : '<i class="ic i-angle-double-right"></i>',
        previous: '<i class="ic i-angle-left"></i>',
        next    : '<i class="ic i-angle-right"></i>'
      },
      cssClasses: {
        root        : 'pagination',
        item        : 'pagination-item',
        link        : 'page-number',
        selectedItem: 'current',
        disabledItem: 'disabled-item'
      }
    })
  ]);

  search.start();

  // Handle and trigger popup window
  $.each('.search-btn', function(element) {
    element.addEventListener('click', function() {
      document.body.style.overflow = 'hidden';
      Velocity($('.search'), "transition.shrinkIn", {
        duration: 200,
        complete: function() {
          $('.search-input').focus();
        }
      });

    });
  });

  // Monitor main search box
  const onPopupClose = function() {
    document.body.style.overflow = '';
    Velocity($('.search'), "transition.shrinkOut");
  };

  $('.search').addEventListener('click', function(event) {
    if (event.target === $('.search')) {
      onPopupClose();
    }
  });
  $('.close-btn').addEventListener('click', onPopupClose);
  window.addEventListener('pjax:success', onPopupClose);
  window.addEventListener('keyup', function(event) {
    if (event.key === 'Escape') {
      onPopupClose();
    }
  });
}

const Loader = {
  timer: null,
  lock: false,
  show: function() {
    clearTimeout(this.timer);
    document.body.classList.remove('loaded');
    Velocity($('.loading'), "fadeIn", {
      display: "flex",
      complete: function() {
        Loader.lock = false;
      }
    });
  },
  hide: function(sec) {
    this.timer = setTimeout(this.vanish, sec||3000);
  },
  vanish: function() {
    if(Loader.lock)
      return;
    Velocity($('.loading'), "fadeOut");
    blockMotion()
    Loader.lock = true;
  }
}

const blockMotion = function() {
  document.body.classList.add('loaded');
  var blocktype = $('main > .inner > .content > .wrap').style.display;
  Velocity($('main > .inner > .content > .wrap'), 'transition.bounceUpIn', {display: blocktype});
}

const addCopyRight = function() {
  if(!$('#copyright'))
    return;

  var body_element = document.getElementsByTagName('body')[0];
  var selection;
  if(window.getSelection){//DOM,FF,Webkit,Chrome,IE10
    selection = window.getSelection();
  }else if(document.getSelection){//IE10
    selection= document.getSelection();
  }else if(document.selection){//IE6+10-
    selection= document.selection.createRange().text;
  }else{
    selection= "";
  }
  var pagelink = $('#copyright').innerHTML;
  var copy_text = selection + '<br>-----------<br>' + pagelink;
  var new_div = document.createElement('div');
  new_div.style.left='-99999px';
  new_div.style.position='absolute';
  body_element.appendChild(new_div );
  new_div.innerHTML = copy_text ;
  selection.selectAllChildren(new_div );
  window.setTimeout(function() {
      body_element.removeChild(new_div );
  },0);
}

const registerExtURL = function() {
  $.each('span.exturl', function(element) {
      var link = document.createElement('a');
      // https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
      link.href = decodeURIComponent(atob(element.dataset.url).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      link.rel = 'noopener external nofollow noreferrer';
      link.target = '_blank';
      link.className = element.className;
      link.title = element.title || element.innerText;
      link.innerHTML = element.innerHTML;
      if(element.dataset.backgroundImage) {
        link.dataset.backgroundImage = element.dataset.backgroundImage;
      }
      element.parentNode.replaceChild(link, element);
    });
}


const pjaxReload = function () {
  pagePostion(window.location.href);

  if(sideBar.classList.contains('on')) {
    Velocity(sideBar, 'transition.slideRightOut', {
      duration: 200,
      complete: function () {
        sideBar.classList.remove('on');
        $('.toggle.menu').classList.remove('close');
      }
    });
  }

  $('.content').innerHTML = '';
  var loading = $('.loading').cloneNode(true)
  Velocity(loading, "fadeIn", {duration: 200});
  $('.content').appendChild(loading);
}

const pjaxScript = function(element) {
  var code = element.text || element.textContent || element.innerHTML || '';
  var parent = element.parentNode;
  parent.removeChild(element);
  var script = document.createElement('script');
  if (element.id) {
    script.id = element.id;
  }
  if (element.className) {
    script.className = element.className;
  }
  if (element.type) {
    script.type = element.type;
  }
  if (element.src) {
    script.src = element.src;
    // Force synchronous loading of peripheral JS.
    script.async = false;
  }
  if (element.dataset.pjax !== undefined) {
    script.dataset.pjax = '';
  }
  if (code !== '') {
    script.appendChild(document.createTextNode(code));
  }
  parent.appendChild(script);
}

const siteRefresh = function (reload) {

  vendorCss('katex');
  vendorJs('copy_tex');
  vendorCss('mermaid');
  vendorJs('chart');

  if(!reload) {
    $.each('script[data-pjax]', pjaxScript);
  }


  originTitle = document.title

  resizeHandle()

  menuActive()

  sideBarTab()
  sidebarTOC()

  postBeauty()
  registerExtURL()


  lozad($.all('img, [data-background-image]'), {
      loaded: function(el) {
          el.classList.add('lozaded');
      }
  }).observe()

  Loader.hide()

  var postion = window.sessionStorage.getItem(window.location.href)
  if(postion) {
    pageScroll(postion);
    window.sessionStorage.removeItem(window.location.href);
  }

  blockMotion()

  $.each('.card', function(element) {
    ['mouseenter', 'touchstart'].forEach(function(item){
      element.addEventListener(item, function(event) {
        if($('.card.active')) {
          $('.card.active').classList.remove('active')
        }
        element.classList.add('active')
      })
    });
    ['mouseleave'].forEach(function(item){
      element.addEventListener(item, function(event) {
        element.classList.remove('active')
      })
    });
  })
}

const siteInit = function () {
  document.body.oncopy = addCopyRight;

  var pjax = new Pjax({
    selectors: [
      'head title',
      '.languages',
      '.pjax',
      'script[data-config]'
    ],
    analytics: false,
    cacheBust: false
  });

  quicklink.listen(CONFIG.quicklink);

  document.addEventListener('visibilitychange', function() {
    switch(document.visibilityState) {
      case 'hidden':
        $('[rel="icon"]').attr('href', statics + CONFIG.favicon.hidden);
        document.title = CONFIG.favicon.hide;
        Loader.show()
        clearTimeout(titleTime);
      break;
      case 'visible':
        $('[rel="icon"]').attr('href', statics + CONFIG.favicon.normal);
        document.title = CONFIG.favicon.show;
        Loader.hide(1000)
        titleTime = setTimeout(function () {
          document.title = originTitle;
        }, 2000);
      break;
    }
  });

  $('.toggle.menu').addEventListener('click', sideBarToggleHandle);
  $('.dimmer').addEventListener('click', sideBarToggleHandle);
  $('.quick .up').addEventListener('click', backToTopHandle);
  $('.quick .down').addEventListener('click', goToBottomHandle);

  $('.loading').addEventListener('click', Loader.vanish);


  window.addEventListener('scroll', scrollHandle);
  backToTop.addEventListener('click', backToTopHandle);
  window.addEventListener('resize', resizeHandle);

  window.addEventListener('pjax:send', pjaxReload);

  window.addEventListener('pjax:success', siteRefresh);

  window.addEventListener("beforeunload", function() {
    pagePostion(window.location.href)
  });

  algoliaSearch(pjax)

  siteRefresh(1)
}

window.addEventListener('DOMContentLoaded', siteInit);
