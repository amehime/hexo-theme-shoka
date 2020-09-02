const pagePostion = function(url) {
  store.set(url, scrollAction.y)
}

const pjaxReload = function () {
  pagePostion(window.location.href);

  if(sideBar.hasClass('on')) {
    Velocity(sideBar, 'transition.slideRightOut', {
      duration: 200,
      complete: function () {
        sideBar.removeClass('on');
        menuToggle.removeClass('close');
      }
    });
  }

  siteContent.innerHTML = loadCat.innerHTML;
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

  toolPlayer.media.load(LOCAL.audio || CONFIG.audio || {});

  lozad($.all('img, [data-background-image]'), {
      loaded: function(el) {
          el.addClass('lozaded');
      }
  }).observe()

  Loader.hide()

  var position = store.get(window.location.href)
  if(position) {
    pageScroll(BODY, position);
    store.del(window.location.href);
  }

  cardActive()
}

const siteInit = function () {
  document.body.oncopy = function() {
    showtip(LOCAL.copyright)
  };

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

  CONFIG.quicklink.ignores = LOCAL.ignores;
  quicklink.listen(CONFIG.quicklink);

  visibilityListener();
  themeColorListener();

  menuToggle.addEventListener('click', sideBarToggleHandle);
  $('.dimmer').addEventListener('click', sideBarToggleHandle);
  quickBtn.child('.down').addEventListener('click', goToBottomHandle);
  quickBtn.child('.up').addEventListener('click', backToTopHandle);
  backToTop.addEventListener('click', backToTopHandle);

  loadCat.addEventListener('click', Loader.vanish);

  window.addEventListener('scroll', scrollHandle);

  goToComment.addEventListener('click', goToCommentHandle);

  toolPlayer.player();

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

console.log('%c Theme.Shoka %c v' + CONFIG.versoin + ' ', 'color: white; background: #e9546b; padding:5px 0;', 'padding:4px;border:1px solid #e9546b;')
