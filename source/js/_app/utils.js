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
  return (CONFIG[asset][type].indexOf('npm')>-1? "//cdn.jsdelivr.net/":statics)+CONFIG[asset][type];
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

const pageScroll = function (target, height, complete) {
  Velocity(target, "scroll", {
    duration: 500,
    easing: "easeOutQuart",
    offset: height || -siteNavHeight,
    complete: complete || function() {}
  });
}
