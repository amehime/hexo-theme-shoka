var statics = CONFIG.statics.indexOf('//') > 0 ? CONFIG.statics : CONFIG.root
var scrollAction = { x: 'undefined', y: 'undefined' };
var diffY = 0;
var originTitle, titleTime;

const BODY = document.getElementsByTagName('body')[0];
const HTML = document.documentElement;
const Container = $('#container');
const loadCat = $('#loading');
const siteNav = $('#nav');
const siteHeader = $('#header');
const menuToggle = siteNav.child('.toggle');
const quickBtn = $('#quick');
const sideBar = $('#sidebar');
const siteBrand = $('#brand');
var toolBtn = $('#tool'), toolPlayer, backToTop, goToComment, showContents;
var siteSearch = $('#search');
var siteNavHeight, headerHightInner, headerHight;

const Loader = {
  timer: null,
  lock: false,
  show: function() {
    clearTimeout(this.timer);
    document.body.removeClass('loaded');
    Velocity(loadCat, "fadeIn", {
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
    Velocity(loadCat, "fadeOut");
    document.body.addClass('loaded');
    Loader.lock = true;
  }
}

const changeTheme = function(type) {
  var btn = $('.theme .ic')
  if(type) {
    HTML.attr('data-theme', type);
    btn.removeClass('i-sun')
    btn.addClass('i-moon')
  } else {
    HTML.attr('data-theme', null);
    btn.removeClass('i-moon');
    btn.addClass('i-sun');
  }
}

const changeMetaTheme = function(color) {
  if(HTML.attr('data-theme') == 'dark')
    color = '#222'

  $('meta[name="theme-color"]').attr('content', color);
}

const themeColorListener = function () {
  window.matchMedia('(prefers-color-scheme: dark)').addListener(function(mediaQueryList) {
    if(mediaQueryList.matches){
      changeTheme('dark');
    } else {
      changeTheme();
    }
  });

  var t = store.get('theme');
  if(t) {
    changeTheme(t);
  }

  $('.theme').addEventListener('click', function(event) {
    var btn = event.currentTarget.child('.ic')

    var neko = BODY.createChild('div', {
      id: 'neko',
      innerHTML: '<div class="planet"><div class="sun"></div><div class="moon"></div></div><div class="body"><div class="face"><section class="eyes left"><span class="pupil"></span></section><section class="eyes right"><span class="pupil"></span></section><span class="nose"></span></div></div>'
    });

    var hideNeko = function() {
      setTimeout(function() {
        Velocity(neko, "fadeOut", {
          complete: function() {
            BODY.removeChild(neko)
          }
        });
      }, 2500);
    }

    if(btn.hasClass('i-sun')) {
      Velocity(neko, "fadeIn", {
        complete: function() {
          neko.addClass('dark');
          changeTheme('dark');
          store.set('theme', 'dark');
          hideNeko();
        }
      });
    } else {
      neko.addClass('dark');
      Velocity(neko, "fadeIn", {
        complete: function() {
          neko.removeClass('dark');
          changeTheme();
          store.del('theme');
          hideNeko();
        }
      });
    }
  });
}

const visibilityListener = function () {
  document.addEventListener('visibilitychange', function() {
    switch(document.visibilityState) {
      case 'hidden':
        $('[rel="icon"]').attr('href', statics + CONFIG.favicon.hidden);
        document.title = LOCAL.favicon.hide;
        Loader.show()
        clearTimeout(titleTime);
      break;
      case 'visible':
        $('[rel="icon"]').attr('href', statics + CONFIG.favicon.normal);
        document.title = LOCAL.favicon.show;
        Loader.hide(1000)
        titleTime = setTimeout(function () {
          document.title = originTitle;
        }, 2000);
      break;
    }
  });
}

const showtip = function(msg) {
  if(!msg)
    return

  var tipbox = BODY.createChild('div', {
    innerHTML: msg,
    className: 'tip'
  });

  setTimeout(function() {
    tipbox.addClass('hide')
    setTimeout(function() {
      BODY.removeChild(tipbox);
    }, 300);
  }, 3000);
}

const resizeHandle = function (event) {
  siteNavHeight = siteNav.height();
  headerHightInner = siteHeader.height();
  headerHight = headerHightInner + $('#waves').height();

  sideBarToggleHandle(null, 1);
  sideBar.style = '';
}

const scrollHandle = function (event) {
  var winHeight = window.innerHeight;
  var docHeight = getDocHeight();
  var contentVisibilityHeight = docHeight > winHeight ? docHeight - winHeight : document.body.scrollHeight - winHeight;
  var SHOW = window.pageYOffset > headerHightInner;
  var startScroll = window.pageYOffset > 0;

  if (SHOW) {
    changeMetaTheme('#FFF');
  } else {
    changeMetaTheme('#222');
  }

  siteNav.toggleClass('show', SHOW);
  toolBtn.toggleClass('affix', startScroll);
  siteBrand.toggleClass('affix', startScroll);
  sideBar.toggleClass('affix', window.pageYOffset > headerHight && document.body.offsetWidth > 991);

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
    siteNav.removeClass('up')
    siteNav.toggleClass('down', SHOW);
  } else if (diffY > 0) {
    // Scroll up
    siteNav.removeClass('down')
    siteNav.toggleClass('up', SHOW);
  } else {
    // First scroll event
  }
  //scrollAction.x = Container.scrollLeft;
  scrollAction.y = window.pageYOffset;

  var scrollPercent = Math.round(Math.min(100 * window.pageYOffset / contentVisibilityHeight, 100)) + '%';
  backToTop.child('span').innerText = scrollPercent;
  $('.percent').width(scrollPercent);
}

const pagePostion = function(url) {
  store.set(url, scrollAction.y)
}

const postionInit = function() {
  var anchor = window.location.hash
  if(anchor) {
    pageScroll($(decodeURI(anchor)));
  } else {
    var position = store.get(window.location.href)
    if(position) {
      pageScroll(BODY, position);
      store.del(window.location.href);
    }
  }
}

const clipBoard = function(str, callback) {
  var ta = BODY.createChild('textarea', {
    style: {
      top: window.scrollY + 'px', // Prevent page scrolling
      position: 'absolute',
      opacity: '0'
    },
    readOnly: true,
    value: str
  });

  const selection = document.getSelection();
  const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false;
  ta.select();
  ta.setSelectionRange(0, str.length);
  ta.readOnly = false;
  var result = document.execCommand('copy');
  callback && callback(result);
  ta.blur(); // For iOS
  if (selected) {
    selection.removeAllRanges();
    selection.addRange(selected);
  }
  BODY.removeChild(ta);
}

const loadRecentComment = function (pjax) {
  // set serverURLs
  var prefix = 'https://'
  var serverURLs = ''
  var options = CONFIG.valine
  if (!options.serverURLs) {
    switch (options.appId.slice(-9)) {
      // TAB
      case '-9Nh9j0Va':
        prefix += 'tab.leancloud.cn';
        break;
        // US
      case '-MdYXbMMI':
        prefix += 'us.avoscloud.com';
        break
      default:
        prefix += 'avoscloud.com';
        break;
    }
  }
  serverURLs = options.serverURLs || prefix
  try {
    AV.init({
      appId: options.appId,
      appKey: options.appKey,
      serverURLs: serverURLs
    })
    var el = $('#rcomment')
    AV.Query.doCloudQuery(
      "select nick, mail, comment, url from Comment where (rid='' or rid is not exists) order by -createdAt limit 0,10"
    ).then(function(rets){
      rets = (rets && rets.results) || []
      const len = rets.length
      if (len) {
        var html = ''
        for (var i = 0; i < len; i++) {
          html += '<li class="item">'
          +'<a href="'+ CONFIG.root + rets[i].get('url') +'#comments">'
          + '<span class="breadcrumb">'+rets[i].get('nick') + ' @ '+ dateFormat(rets[i].createdAt)+'</span>'
          + '<span>'+rets[i].get('comment').replace(/<[^>]+>/gi, '').substr(0, 100)+'</span></a>'
          +'</li>'
        }

        el.createChild('ul', {
          innerHTML: html
        })

        pjax.refresh(el);
      }
    }).catch(function(e){})
  } catch (e) {}
}
