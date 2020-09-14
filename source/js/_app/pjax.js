const domInit = function() {
  $.each('.overview .menu > .item', function(el) {
    siteNav.child('.menu').appendChild(el.cloneNode(true));
  })

  loadCat.addEventListener('click', Loader.vanish);
  menuToggle.addEventListener('click', sideBarToggleHandle);
  $('.dimmer').addEventListener('click', sideBarToggleHandle);

  quickBtn.child('.down').addEventListener('click', goToBottomHandle);
  quickBtn.child('.up').addEventListener('click', backToTopHandle);

  if(!toolBtn) {
    toolBtn = siteHeader.createChild('div', {
      id: 'tool',
      innerHTML: '<div class="item player"></div><div class="item contents"><i class="ic i-list-ol"></i></div><div class="item chat"><i class="ic i-comments"></i></div><div class="item back-to-top"><i class="ic i-arrow-up"></i><span>0%</span></div>'
    });
  }

  toolPlayer = toolBtn.child('.player');
  backToTop = toolBtn.child('.back-to-top');
  goToComment = toolBtn.child('.chat');
  showContents = toolBtn.child('.contents');

  backToTop.addEventListener('click', backToTopHandle);
  goToComment.addEventListener('click', goToCommentHandle);
  showContents.addEventListener('click', sideBarToggleHandle);

  toolPlayer.player();
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

  $('#content').innerHTML = ''
  $('#content').appendChild(loadCat.lastChild.cloneNode(true));
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

  registerExtURL()
  postBeauty()

  toolPlayer.media.load(LOCAL.audio || CONFIG.audio || {})

  lozad($.all('img, [data-background-image]'), {
      loaded: function(el) {
          el.addClass('lozaded');
      }
  }).observe()

  Loader.hide()

  postionInit()

  cardActive()
}

const siteInit = function () {
  domInit()

  var pjax = new Pjax({
    selectors: [
      'head title',
      '.languages',
      '.pjax',
      'script[data-config]'
    ],
    analytics: false,
    cacheBust: false
  })

  CONFIG.quicklink.ignores = LOCAL.ignores
  quicklink.listen(CONFIG.quicklink)

  visibilityListener()
  themeColorListener()

  algoliaSearch(pjax)

  window.addEventListener('scroll', scrollHandle)

  window.addEventListener('resize', resizeHandle)

  window.addEventListener('pjax:send', pjaxReload)

  window.addEventListener('pjax:success', siteRefresh)

  window.addEventListener("beforeunload", function() {
    pagePostion(window.location.href)
  })

  siteRefresh(1)
}

window.addEventListener('DOMContentLoaded', siteInit);

console.log('%c Theme.Shoka v' + CONFIG.version + ' %c https://shoka.lostyu.me/ ', 'color: white; background: #e9546b; padding:5px 0;', 'padding:4px;border:1px solid #e9546b;')
