const sideBarToggleHandle = function (event, force) {
  if(sideBar.hasClass('on')) {
    sideBar.removeClass('on');
    menuToggle.removeClass('close');
    if(force) {
      sideBar.style = '';
    } else {
      transition(sideBar, 'slideRightOut');
    }
  } else {
    if(force) {
      sideBar.style = '';
    } else {
      transition(sideBar, 'slideRightIn', function () {
          sideBar.addClass('on');
          menuToggle.addClass('close');
        });
    }
  }
}

const sideBarTab = function () {
  var sideBarInner = sideBar.child('.inner');
  var panels = sideBar.find('.panel');

  if(sideBar.child('.tab')) {
    sideBarInner.removeChild(sideBar.child('.tab'));
  }

  var list = document.createElement('ul'), active = 'active';
  list.className = 'tab';

  ['contents', 'related', 'overview'].forEach(function (item) {
    var element = sideBar.child('.panel.' + item)

    if(element.innerHTML.replace(/(^\s*)|(\s*$)/g, "").length < 1) {
      if(item == 'contents') {
        showContents.display("none")
      }
      return;
    }

    if(item == 'contents') {
      showContents.display("")
    }

    var tab = document.createElement('li')
    var span = document.createElement('span')
    var text = document.createTextNode(element.attr('data-title'));
    span.appendChild(text);
    tab.appendChild(span);
    tab.addClass(item + ' item');

    if(active) {
      element.addClass(active);
      tab.addClass(active);
    } else {
      element.removeClass('active');
    }

    tab.addEventListener('click', function (element) {
      var target = event.currentTarget;
      if (target.hasClass('active'))
        return;

      sideBar.find('.tab .item').forEach(function (element) {
        element.removeClass('active')
      });

      sideBar.find('.panel').forEach(function (element) {
        element.removeClass('active')
      });

      sideBar.child('.panel.' + target.className.replace(' item', '')).addClass('active');

      target.addClass('active');
    });

    list.appendChild(tab);
    active = '';
  });

  if (list.childNodes.length > 1) {
    sideBarInner.insertBefore(list, sideBarInner.childNodes[0]);
    sideBar.child('.panels').style.paddingTop = ''
  } else {
    sideBar.child('.panels').style.paddingTop = '.625rem'
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
    var link = element.child('a.toc-link');
    var anchor = $(decodeURI(link.attr('href')));
    if(!anchor)
      return
    var alink = anchor.child('a.anchor');

    var anchorScroll = function (event) {
      event.preventDefault();
      var target = $(decodeURI(event.currentTarget.attr('href')));

      activeLock = index;
      pageScroll(target, null, function() {
          activateNavByIndex(index)
          activeLock = null
        })
    };

    // TOC item animation navigate.
    link.addEventListener('click', anchorScroll);
    alink && alink.addEventListener('click', function(event) {
      anchorScroll(event)
      clipBoard(CONFIG.hostname + '/' + LOCAL.path + event.currentTarget.attr('href'))
    });
    return anchor;
  });

  var tocElement = sideBar.child('.contents.panel');

  var activateNavByIndex = function (index, lock) {
    var target = navItems[index]

    if (!target)
      return;

    if (target.hasClass('current')) {
      return;
    }

    $.each('.toc .active', function (element) {
      element && element.removeClass('active current');
    });

    sections.forEach(function (element) {
      element && element.removeClass('active');
    });

    target.addClass('active current');
    sections[index] && sections[index].addClass('active');

    var parent = target.parentNode;

    while (!parent.matches('.contents')) {
      if (parent.matches('li')) {
        parent.addClass('active');
        var t = $(parent.child('a.toc-link').attr('href'))
        if(t) {
          t.addClass('active');
        }
      }
      parent = parent.parentNode;
    }
    // Scrolling to center active TOC element if TOC content is taller then viewport.
    if(getComputedStyle(sideBar).display != 'none' && tocElement.hasClass('active')) {
      pageScroll(tocElement, target.offsetTop- (tocElement.offsetHeight / 4))
    }
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
    if (!window.IntersectionObserver)
      return

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

const backToTopHandle = function () {
  pageScroll(0);
}

const goToBottomHandle = function () {
  pageScroll(parseInt(Container.height()));
}

const goToCommentHandle = function () {
  pageScroll($('#comments'));
}

const menuActive = function () {
  $.each('.menu .item:not(.title)', function (element) {
    var target = element.child('a[href]');
    var parentItem = element.parentNode.parentNode;
    if (!target) return;
    var isSamePath = target.pathname === location.pathname || target.pathname === location.pathname.replace('index.html', '');
    var isSubPath = !CONFIG.root.startsWith(target.pathname) && location.pathname.startsWith(target.pathname);
    var active = target.hostname === location.hostname && (isSamePath || isSubPath)
    element.toggleClass('active', active);
    if(element.parentNode.child('.active') && parentItem.hasClass('dropdown')) {
      parentItem.removeClass('active').addClass('expand');
    } else {
      parentItem.removeClass('expand');
    }
  });
}
