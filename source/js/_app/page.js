const cardActive = function() {
  if(!$('.index.wrap'))
    return

  var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(article) {
        if (!window.IntersectionObserver) {
          if( article.target.hasClass("show") === false){
              article.target.addClass("show");
          }
        } else {
          if (article.target.hasClass("show")) {
            io.unobserve(article.target)
          } else {
            if (article.isIntersecting) {
              article.target.addClass("show");
              io.unobserve(article.target);
            }
          }
        }
      })
  }, {
      root: null,
      threshold: [0.3]
  });

  $.each('.index.wrap article.item, .index.wrap section.item', function(article) {
      io.observe(article)
  })

  $('.index.wrap .item:first-child').addClass("show")
  // var tabs;

  $.each('.cards .item', function(element, index) {
    ['mouseenter', 'touchstart'].forEach(function(item){
      element.addEventListener(item, function(event) {
        if($('.cards .item.active')) {
          $('.cards .item.active').removeClass('active')
        }
        element.addClass('active')
      })
    });
    ['mouseleave'].forEach(function(item){
      element.addEventListener(item, function(event) {
        element.removeClass('active')
      })
    });

    // if (index == 0) {
    //   tabs = document.createElement('ul');
    //   tabs.addClass('filter');
    //   element.parentNode.parentNode.insertBefore(tabs, element.parentNode)
    // }
    // var top = $('#'+element.child('.cover').attr('data-top'));
    // if(!top) {
    //   top = document.createElement('li');
    //   top.id = element.child('.cover').attr('data-top');

    //   top.addEventListener('click', function(event) {
    //     var tab = event.currentTarget;
    //     tab.parentNode.find('.show').forEach(function(el) {
    //       el.removeClass('show');
    //     })
    //     $.each('[data-top=' + tab.attr('id') + ']', function(el) {
    //       el.parentNode.parentNode.addClass('hide')
    //       el.parentNode.addClass('show')
    //     })
    //   })

    //   tabs.appendChild(top)
    // }
  });
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

const postBeauty = function () {
  loadComments();

  if(!$('.md'))
    return

  $('.post.block').oncopy = function(event) {
    showtip(LOCAL.copyright)

    var copyright = $('#copyright')
    if(window.getSelection().toString().length > 30 && copyright) {
      event.preventDefault();
      var author = "# " + copyright.child('.author').innerText
      var link = "# " + copyright.child('.link').innerText
      var license = "# " + copyright.child('.license').innerText
      var htmlData = author + "<br>" + link + "<br>" + license + "<br><br>" + window.getSelection().toString().replace(/\r\n/g, "<br>");;
      var textData = author + "\n" + link + "\n" + license + "\n\n" + window.getSelection().toString().replace(/\r\n/g, "\n");
      if (event.clipboardData) {
          event.clipboardData.setData("text/html", htmlData);
          event.clipboardData.setData("text/plain", textData);
      } else if (window.clipboardData) {
          return window.clipboardData.setData("text", textData);
      }
    }
  }

  $.each('.md img', function(element) {
    var info;
    if(info = element.attr('title')) {
      var para = document.createElement('span');
      var txt = document.createTextNode(info);
      para.appendChild(txt);
      para.addClass('image-info');
      element.insertAfter(para);
    }
  });
  if($('.md :not(a) > img, .md > img')) {
    LOCAL['mediumzoom'] = true;
    vendorJs('mediumzoom', function() {
        window.mediumZoom('.md :not(a) > img, .md > img', {
          background: 'rgba(0, 0, 0, 0.6)'
        });
      }, window.mediumZoom);
  }

  $.each('li ruby', function(element) {
    var parent = element.parentNode;
    if(element.parentNode.tagName != 'LI') {
      parent = element.parentNode.parentNode;
    }
    parent.addClass('ruby');
  })

  $.each('.md > table', function (element) {
    element.wrap({
      className: 'table-container'
    });
  });

  $.each('.highlight > table', function (element) {
    element.wrap({
      className: 'code-container'
    });
  });

  $.each('figure.highlight', function (element) {

    var code_container = element.child('.code-container');

    element.insertAdjacentHTML('beforeend', '<div class="operation"><span class="breakline-btn"><i class="ic i-align-left"></i></span><span class="copy-btn"><i class="ic i-clipboard"></i></span><span class="fullscreen-btn"><i class="ic i-expand"></i></span></div>');

    var copyBtn = element.child('.copy-btn');
    copyBtn.addEventListener('click', function (event) {
      var target = event.currentTarget;
      var comma = '', code = '';
      code_container.find('pre').forEach(function(line) {
        code += comma + line.innerText;
        comma = '\n'
      })

      clipBoard(code, function(result) {
        target.child('.ic').className = result ? 'ic i-check' : 'ic i-times';
        target.blur();
        showtip(LOCAL.copyright);
      })
    });
    copyBtn.addEventListener('mouseleave', function (event) {
      setTimeout(function () {
        event.target.child('.ic').className = 'ic i-clipboard';
      }, 1000);
    });

    var breakBtn = element.child('.breakline-btn');
    breakBtn.addEventListener('click', function (event) {
      var target = event.currentTarget;
      if (element.hasClass('breakline')) {
        element.removeClass('breakline');
        target.child('.ic').className = 'ic i-align-left';
      } else {
        element.addClass('breakline');
        target.child('.ic').className = 'ic i-align-justify';
      }
    });

    var fullscreenBtn = element.child('.fullscreen-btn');
    var removeFullscreen = function() {
      element.removeClass('fullscreen');
      BODY.removeClass('fullscreen');
      fullscreenBtn.child('.ic').className = 'ic i-expand';
    }
    var fullscreenHandle = function(event) {
      var target = event.currentTarget;
      if (element.hasClass('fullscreen')) {
        removeFullscreen();
        hideCode && hideCode();
        pageScroll(element)
      } else {
        element.addClass('fullscreen');
        BODY.addClass('fullscreen');
        fullscreenBtn.child('.ic').className = 'ic i-compress';
        showCode && showCode();
      }
    }
    fullscreenBtn.addEventListener('click', fullscreenHandle);
    element.child('figcaption').addEventListener('click', fullscreenHandle);


    if(code_container && code_container.height() > 300) {
      code_container.style.maxHeight = "300px";
      code_container.insertAdjacentHTML('beforeend', '<div class="show-btn"><i class="ic i-angle-down"></i></div>');
      var showBtn = code_container.child('.show-btn');
      var showBtnIcon = showBtn.child('i');

      var showCode = function() {
        code_container.style.maxHeight = ""
        showBtn.addClass('open')
      }

      var hideCode = function() {
        code_container.style.maxHeight = "300px"
        showBtn.removeClass('open')
      }

      showBtn.addEventListener('click', function(event) {
        if (showBtn.hasClass('open')) {
          removeFullscreen()
          hideCode()
          pageScroll(code_container.parentNode)
        } else {
          showCode()
        }
      });
    }
  });

  $.each('pre.mermaid > svg', function (element) {
    element.style.maxWidth = ''
  });

  $.each('.reward button', function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      var qr = $('#qr')
      if(qr.display() === 'inline-flex') {
        Velocity(qr, "fadeOut");
      } else {
        Velocity(qr, "transition.slideUpBigIn", {display: 'inline-flex'});
      }
    });
  });

  //quiz
  $.each('.quiz > ul.options li', function (element) {
    element.addEventListener('click', function (event) {
      if (element.hasClass('correct')) {
        element.toggleClass('right')
        element.parentNode.parentNode.addClass('show')
      } else {
        element.toggleClass('wrong')
      }
    });
  });

  $.each('.quiz > p', function (element) {
    element.addEventListener('click', function (event) {
      element.parentNode.toggleClass('show')
    });
  });

  // tab
  $.each('div.tab', function(element, index) {
    var id = element.attr('data-id');
    var title = element.attr('data-title');
    var box = $('#' + id);
    if(!box) {
      box = document.createElement('div');
      box.className = 'tabs';
      box.id = id;
      element.parentNode.insertBefore(box, element);
    }

    var ul = box.child('.nav');
    if(!ul) {
      ul = box.createChild('ul', {
        className: 'nav'
      });
    }

    var li = ul.createChild('li', {
      innerHTML: title
    });
    if(index == 0) {
      li.addClass('active');
      element.addClass('active');
    }

    li.addEventListener('click', function(event) {
      var target = event.currentTarget;
      box.find('.active').forEach(function(el) {
        el.removeClass('active');
      })
      element.addClass('active');
      target.addClass('active');
    });

    box.appendChild(element);
  });
}

const loadComments = function () {
  var element = $('#comments');
  if (!element) {
    goToComment.display("none")
    return;
  } else {
    goToComment.display("")
    vendorJs('valine', function() {
      var options = CONFIG.valine;
      options.el = '#comments';
      options.path = element.attr('data-id');

      new Valine(options);
    }, window.Valine);
  }

  var io = new IntersectionObserver(function(entries, observer) {
    var entry = entries[0];
    vendorCss('valine');
    if (entry.isIntersecting) {
      Velocity($('#comments'), 'transition.bounceUpIn');
      observer.disconnect();
    }
  });

  io.observe(element);
}

const algoliaSearch = function(pjax) {
  if(CONFIG.search === null)
    return

  if(!siteSearch) {
    siteSearch = BODY.createChild('div', {
      id: 'search',
      innerHTML: '<div class="inner"><div class="header"><span class="icon"><i class="ic i-search"></i></span><div class="search-input-container"></div><span class="close-btn"><i class="ic i-times-circle"></i></span></div><div class="results"><div class="inner"><div id="search-stats"></div><div id="search-hits"></div><div id="search-pagination"></div></div></div></div>'
    });
  }

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
      placeholder         : LOCAL.search.placeholder,
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
          var stats = LOCAL.search.stats
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
              LOCAL.search.empty.replace(/\$\{query}/, data.query) +
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
  $.each('.search', function(element) {
    element.addEventListener('click', function() {
      document.body.style.overflow = 'hidden';
      Velocity(siteSearch, "transition.shrinkIn", {
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
    Velocity(siteSearch, "transition.shrinkOut");
  };

  siteSearch.addEventListener('click', function(event) {
    if (event.target === siteSearch) {
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
