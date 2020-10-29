const getRndInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getDocHeight = function () {
  return $('main > .inner').offsetHeight;
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

const assetUrl = function(asset, type) {
  var str = CONFIG[asset][type]
  if(str.indexOf('npm')>-1||str.indexOf('gh')>-1||str.indexOf('combine')>-1)
    return "//cdn.jsdelivr.net/" + str

  if(str.indexOf('http')>-1)
    return str

  return statics + str;
}

const vendorJs = function(type, callback, condition) {
  if(LOCAL[type]) {
    getScript(assetUrl("js", type), callback || function(){
      window[type] = true;
    }, condition || window[type]);
  }
}

const vendorCss = function(type, condition) {
  if(window['css'+type])
    return;

  if(LOCAL[type]) {

    document.head.createChild('link', {
      rel: 'stylesheet',
      href: assetUrl("css", type)
    });

    window['css'+type] = true;
  }
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

const pageScroll = function(target, offset, complete) {
  var opt = {
    targets: typeof offset == 'number' ? target.parentNode : document.scrollingElement,
    duration: 500,
    easing: "easeInOutQuad",
    scrollTop: offset || (typeof target == 'number' ? target : (target ? target.top() + document.documentElement.scrollTop - siteNavHeight : 0)),
    complete: function() {
      complete && complete()
    }
  }
  anime(opt);
}

const transition = function(target, type, complete) {
  var animation = {}
  var display = 'none'
  switch(type) {
    case 0:
      animation = {opacity: [1, 0]}
    break;
    case 1:
      animation = {opacity: [0, 1]}
      display = 'block'
    break;
    case 'bounceUpIn':
      animation = {
        begin: function(anim) {
          target.display('block')
        },
        translateY: [
          { value: -60, duration: 200 },
          { value: 10, duration: 200 },
          { value: -5, duration: 200 },
          { value: 0, duration: 200 }
        ],
        opacity: [0, 1]
      }
      display = 'block'
    break;
    case 'shrinkIn':
      animation = {
        begin: function(anim) {
          target.display('block')
        },
        scale: [
          { value: 1.1, duration: 300 },
          { value: 1, duration: 200 }
        ],
        opacity: 1
      }
      display = 'block'
    break;
    case 'slideRightIn':
      animation = {
        begin: function(anim) {
          target.display('block')
        },
        translateX: [100, 0],
        opacity: [0, 1]
      }
      display = 'block'
    break;
    case 'slideRightOut':
      animation = {
        translateX: [0, 100],
        opacity: [1, 0]
      }
    break;
    default:
      animation = type
      display = type.display
    break;
  }
  anime(Object.assign({
    targets: target,
    duration: 200,
    easing: 'linear'
  }, animation)).finished.then(function() {
      target.display(display)
      complete && complete()
    });
}

const store = {
  get: function(item) {
    return localStorage.getItem(item);
  },
  set: function(item, str) {
    localStorage.setItem(item, str);
    return str;
  },
  del: function(item) {
    localStorage.removeItem(item);
  }
}
