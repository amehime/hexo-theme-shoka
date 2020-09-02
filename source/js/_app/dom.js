const $ = function(selector, element) {
  element = element || document;
  if(selector.indexOf('#') === 0) {
    return element.getElementById(selector.replace('#', ''))
  }
  return element.querySelector(selector)
};

$.all = function(selector, element) {
  element = element || document;
  return element.querySelectorAll(selector)
};

$.each = function(selector, callback, element) {
  return $.all(selector, element).forEach(callback)
}


Object.assign(HTMLElement.prototype, {
  wrap: function (wrapper) {
    this.parentNode.insertBefore(wrapper, this);
    this.parentNode.removeChild(this);
    wrapper.appendChild(this);
  },
  height: function(h) {
    if(h) {
      this.style.height = typeof h == 'number' ? h + 'rem' : h;
    }
    return this.getBoundingClientRect().height
  },
  width: function(w) {
    if(w) {
      this.style.width = typeof w == 'number' ? w + 'rem' : w;
    }
    return this.getBoundingClientRect().width
  },
  top: function() {
    return this.getBoundingClientRect().top
  },
  left:function() {
    return this.getBoundingClientRect().left
  },
  attr: function(type, value) {
    if(value === null) {
      return this.removeAttribute(type)
    }

    if(value) {
      return this.setAttribute(type, value)
    } else {
      return this.getAttribute(type)
    }
  },
  insertAfter: function(element) {
    var parent = this.parentNode;
    if(parent.lastChild == this){
        parent.appendChild(element);
    }else{
        parent.insertBefore(element, this.nextSibling);
    }
  },
  display: function(d) {
    this.style.display = d;
  },
  child: function(selector) {
    return $(selector, this)
  },
  find: function(selector) {
    return $.all(selector, this)
  },
  _class: function(type, className, display) {
    var classNames = className.indexOf(' ') ?  className.split(' ') : [className];
    var that = this;
    classNames.forEach(function(name) {
      if(type == 'toggle') {
        that.classList.toggle(name, display)
      } else {
        that.classList[type](name)
      }
    })
  },
  addClass: function(className) {
    this._class('add', className);
    return this;
  },
  removeClass: function(className) {
    this._class('remove', className);
    return this;
  },
  toggleClass: function(className, display) {
    this._class('toggle', className, display);
    return this;
  },
  hasClass: function(className) {
    return this.classList.contains(className)
  }
});

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

const mediaPlayer = function(config) {
  var t = this,
  option = {
    type: 'audio',
    mode: 'random',
    btns: ['play-pause', 'music'],
    events: {
      "play-pause": function(event) {
        if(t.media.source.paused) {
          t.media.play()
        } else {
          t.media.pause()
        }
      },
      "music": function(event) {
        t.media.list.toggleClass('on');
        t.media.scroll();
      }
    }
  };

  var
    utils = {
      random: function(len) {
        return Math.floor((Math.random()*len))
      },
      parse: function(link) {
        var result = [];
        [
          ['music.163.com.*song.*id=(\\d+)', 'netease', 'song'],
          ['music.163.com.*album.*id=(\\d+)', 'netease', 'album'],
          ['music.163.com.*artist.*id=(\\d+)', 'netease', 'artist'],
          ['music.163.com.*playlist.*id=(\\d+)', 'netease', 'playlist'],
          ['music.163.com.*discover/toplist.*id=(\\d+)', 'netease', 'playlist'],
          ['y.qq.com.*song/(\\w+).html', 'tencent', 'song'],
          ['y.qq.com.*album/(\\w+).html', 'tencent', 'album'],
          ['y.qq.com.*singer/(\\w+).html', 'tencent', 'artist'],
          ['y.qq.com.*playsquare/(\\w+).html', 'tencent', 'playlist'],
          ['y.qq.com.*playlist/(\\w+).html', 'tencent', 'playlist'],
          ['xiami.com.*song/(\\w+)', 'xiami', 'song'],
          ['xiami.com.*album/(\\w+)', 'xiami', 'album'],
          ['xiami.com.*artist/(\\w+)', 'xiami', 'artist'],
          ['xiami.com.*collect/(\\w+)', 'xiami', 'playlist'],
        ].forEach(function(rule) {
          var patt = new RegExp(rule[0])
          var res = patt.exec(link)
          if (res !== null) {
            result = [rule[1], rule[2], res[1]]
          }
        })
        return result
      },
      lrc: function(lrc_s) {
        if (lrc_s) {
            lrc_s = lrc_s.replace(/([^\]^\n])\[/g, function(match, p1){return p1 + '\n['});
            const lyric = lrc_s.split('\n');
            var lrc = [];
            const lyricLen = lyric.length;
            for (var i = 0; i < lyricLen; i++) {
                // match lrc time
                const lrcTimes = lyric[i].match(/\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g);
                // match lrc text
                const lrcText = lyric[i]
                    .replace(/.*\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g, '')
                    .replace(/<(\d{2}):(\d{2})(\.(\d{2,3}))?>/g, '')
                    .replace(/^\s+|\s+$/g, '');

                if (lrcTimes) {
                    // handle multiple time tag
                    const timeLen = lrcTimes.length;
                    for (var j = 0; j < timeLen; j++) {
                        const oneTime = /\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/.exec(lrcTimes[j]);
                        const min2sec = oneTime[1] * 60;
                        const sec2sec = parseInt(oneTime[2]);
                        const msec2sec = oneTime[4] ? parseInt(oneTime[4]) / ((oneTime[4] + '').length === 2 ? 100 : 1000) : 0;
                        const lrcTime = min2sec + sec2sec + msec2sec;
                        lrc.push([lrcTime, lrcText]);
                    }
                }
            }
            // sort by time
            lrc = lrc.filter(function(item){return item[1]});
            lrc.sort(function(a, b){return a[0] - b[0]});
            return lrc;
        } else {
            return [];
        }
      }
    }

  t.media = {
    pointer: -1,
    source: null,
    buttons: {},
    playlist: [],
    lrc: {},
    fetch: function(source, callback) {
      var that = this
      var list = []

      return new Promise(function(resolve, reject){
        source.forEach(function(raw) {
          var meta = utils.parse(raw)
          var skey = JSON.stringify(meta)
          var playlist = store.get(skey)
          if(playlist) {
            list.push.apply(list, JSON.parse(playlist));
            resolve(list);
          } else {
            fetch('https://api.i-meto.com/meting/api?server='+meta[0]+'&type='+meta[1]+'&id='+meta[2]+'&r='+ Math.random())
              .then(function(response) {
                return response.json()
              }).then(function(json) {
                store.set(skey, JSON.stringify(json))
                list.push.apply(list, json);
                resolve(list);
              }).catch(function(ex) {})
          }
        })
      })
    },
    load: function(newList) {
      if(newList) {
        if(this.options.rawList !== newList) {
          var that = this
          this.options.rawList = newList;

          this.fetch(newList).then(function(list) {
            that.playlist = list;
            create.list();
            that.setMode(that.options.mode);
          });
        }
      }
    },
    // 根据模式切换当前曲目pointer
    setMode: function(mode) {
      var total = this.playlist.length;

      if(!total)
        return;

      var next = function(pointer) {
        if((pointer + 1) == total) {
          pointer = -1;
        }
        t.media.pointer = ++pointer;
      }

      switch (mode) {
        case 'random':
          var p = utils.random(total)
          if(this.pointer !== p) {
            this.pointer = p
          } else {
            next(this.pointer)
          }
          break;
        case 'next':
          next(this.pointer)
          break;
      }

      this.setSource()
    },
    // 直接设置当前曲目pointer
    setCurrent: function(pointer) {
      if(typeof pointer == 'number' && pointer != this.pointer && this.playlist[pointer] && !this.playlist[pointer]['error']) {
        this.pointer = pointer;
        this.setSource()
      }
    },
    // 更新source为当前曲目pointer
    setSource: function() {
      var item = this.playlist[this.pointer]

      if(item['error']) {
        return;
      }

      var playing = false;
      if(!this.source.paused) {
        playing = true
        this.stop()
      }

      this.source.attr('src', item.url);
      this.source.attr('title', item.title + ' - ' + item.author);

      create.progress()
      create.preview()

      if(playing == true) {
        this.play()
      }
    },
    play: function() {
      if(this.playlist[this.pointer]['error']) {
        return;
      }
      this.source.play()
      document.title = 'Now Playing...' + this.playlist[this.pointer]['title'] + ' - ' + this.playlist[this.pointer]['author'] + ' | ' + originTitle;
    },
    pause: function() {
      this.source.pause()
      document.title = originTitle
    },
    stop: function() {
      this.source.pause();
      this.source.currentTime = 0;
      document.title = originTitle;
    },
    scroll: function() {
      var current = this.list.find('li')[this.pointer];
      Velocity(current, "scroll", {
        container: current.parentNode
      });
    },
    scrollLrc: function(currentTime) {
      var that = this
      if(!this.lrc)
        return

      if (this.lrc.index > this.lrc.data.length - 1 || currentTime < this.lrc.data[this.lrc.index][0] || (!this.lrc.data[this.lrc.index + 1] || currentTime >= this.lrc.data[this.lrc.index + 1][0])) {
          for (var i = 0; i < this.lrc.data.length; i++) {
              if (currentTime >= this.lrc.data[i][0] && (!this.lrc.data[i + 1] || currentTime < this.lrc.data[i + 1][0])) {
                  that.lrc.index = i;
                  var y = -(that.lrc.index-1);
                  that.lrc.el.style.transform = 'translateY('+y+'rem)';
                  that.lrc.el.style.webkitTransform = 'translateY('+y+'rem)';
                  that.lrc.el.getElementsByClassName('current')[0].removeClass('current');
                  that.lrc.el.getElementsByTagName('p')[i].addClass('current');
              }
          }
      }
    }
  };

  var create = {
    button: function(b) {
      if(!t.media.buttons[b]) {
        var el = document.createElement('div');
        el.addClass(b + ' btn');
        el.addEventListener('click', t.media.options.events[b] || function(){});
        t.appendChild(el);
        t.media.buttons[b] = el;
      }
    },
    audio: function() {
      if(!t.media.source) {
        var el = document.createElement('audio');

        el.addEventListener('error', function() {
          t.media.list.find('li')[t.media.pointer].addClass('error')
          t.media.playlist[t.media.pointer]['error'] = true
          t.media.setMode('next');
        });

        el.addEventListener('play', function() {
          t.addClass('playing');
          t.media.list.addClass('playing');
          showtip(el.attr('title'))
        });

        el.addEventListener('pause', function() {
          t.removeClass('playing');
          t.media.list.removeClass('playing');
        });

        el.addEventListener('timeupdate', function() {
          var percent = Math.floor((el.currentTime / el.duration * 100));
          t.media.progress.width(percent + '%');
          if(t.media.lrc) {
            t.media.scrollLrc(el.currentTime)
          }
          if (percent == 100) { // 下一曲
            t.media.setMode('next');
            t.media.play();
          }
        });

        t.appendChild(el);
        t.media.source = el;
      }
    },
    info: function() {
      if(!t.media.list) {
        var el = document.createElement('div');
        el.addClass('play-list');
        el.innerHTML = '<div class="preview"></div><ol></ol>';
        t.media.list = el;
        t.insertAfter(el);

        $('#main').addEventListener('click', function() {
          t.media.list.removeClass('on');
        })
      }
    },
    list: function() {
      var list = t.media.list.child("ol");
      list.innerHTML = "";
      t.media.playlist.forEach(function(item, index) {
        var el = document.createElement('li');
        el.innerHTML = '<span class="info"><span>'+item.title+'</span><span>'+item.author+'</span></span>';
        el.title = item.title + ' - ' + item.author

        el.addEventListener('click', function(event) {
          var current = event.currentTarget;
          if(t.media.pointer === index && t.media.progress) {
            if(t.media.source.paused) {
              t.media.play();
            } else {
              t.media.source.currentTime = t.media.source.duration * Math.floor((event.clientX - current.left()))/current.width();
            }
            return;
          }
          t.media.setCurrent(index);
          t.media.play();
        });

        list.appendChild(el);
      })
    },
    progress: function() {
      if(t.media.progress) {
        t.media.progress.parentNode.removeClass('current');
        t.media.progress.remove();
      }

      var current = t.media.list.find('li')[t.media.pointer];
      if(current) {
        var progress = document.createElement('div');
        progress.addClass('progress')
        current.appendChild(progress);
        t.media.progress = progress;
        current.addClass('current');

        t.media.scroll()
      }
    },
    preview: function() {
      var preview = t.media.list.child('.preview')
      var current = t.media.playlist[t.media.pointer]
      preview.innerHTML = '<div class="cover"><div class="disc"><img src="'+current.pic+'" /></div></div>'
      + '<div class="info"><h4 class="title">'+current.title+'</h4><span>'+current.author+'</span><div class="lrc"></div></div>'

      var lrc = '';
      fetch(current.lrc)
        .then(function(response) {
          return response.text()
        }).then(function(body) {
          if(current !== t.media.playlist[t.media.pointer])
            return;

          t.media.lrc.data = utils.lrc(body)
          var result = ''
          t.media.lrc.data.forEach(function(line, index) {
            lrc += '<p'+(index===0?' class="current"':'')+'>'+line[1]+'</p>';
          })

          var el = document.createElement('div');
          el.addClass('inner');
          el.innerHTML = lrc;
          preview.child('.lrc').innerHTML = '';
          preview.child('.lrc').appendChild(el);
          t.media.lrc.el = el;
          t.media.lrc.index = 0;
        }).catch(function(ex) {})

      preview.child('.cover').addEventListener('click', t.media.options.events['play-pause'])
    }
  },
  init = function(config) {
    if(t.media.created)
      return;

    t.media.options = Object.assign(option, config);
    // 初始化button以及click事件
    t.media.options.btns.forEach(create.button);
    // 初始化audio
    create[t.media.options.type]();
    // 初始化播放列表等
    create.info();

    t.media.created = true;
  }

  init(config);
}


Object.assign(HTMLElement.prototype, {
  player: mediaPlayer
})
