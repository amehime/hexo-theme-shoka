---
title: Step.2 基本配置
date: 2020/08/13 20:56:48
categories:
- [计算机科学, 二进制杂谈, Theme Shoka Documentation]
tags:
- Hexo
- 教程
valine:
  placeholder: "1. 提问前请先仔细阅读本文档⚡\n2. 页面显示问题💥，请提供控制台截图📸或者您的测试网址\n3. 其他任何报错💣，请提供详细描述和截图📸，祝食用愉快💪"
audio: false
---

:::primary
[:rocket:快速开始](/computer-science/note/theme-shoka-doc/) - [:love_letter:依赖插件](/computer-science/note/theme-shoka-doc/dependents/) - [**:pushpin:基本配置**](/computer-science/note/theme-shoka-doc/config/) - [:rainbow:界面显示](/computer-science/note/theme-shoka-doc/display/) - [:unicorn:特殊功能](/computer-science/note/theme-shoka-doc/special/)
:::

这里修改的是`themes/shoka/_config.yml`内的配置参数。
建议在根目录新建一个yml文件，命名为`_config.shoka.yml`，并在这个自定义文件中增改配置，而非直接修改主体文件夹内的`_config.yml`。

# 站点别称
```yml
alternate: Yume Shoka
```
这里设置的名称代替Logo，显示在页面顶部，以及页尾:copyright:处

# 静态文件目录
```yml
statics: / #//cdn.jsdelivr.net/gh/amehime/shoka@latest/
```
默认值是`/`，指使用本地静态文件
可以修改成`//cdn.jsdelivr.net/gh/您的github用户名/您的项目名@latest/`这种形式，以使用jsDelivr进行加速。
PS：jsDelivr并不是实时更新，重新生成文件后需要耐心等待

```yml
assets: assets
css: css
js: js
images: images
```
静态文件所处目录的实际目录名，这些一般不改。

# 加载谷歌字体
```yml
font:
  enable: true
  # Font options:
  # `external: true` will load this font family from `host` above.
  # `family: Times New Roman`. Without any quotes.
  # `size: x.x`. Use `em` as unit. Default: 1 (16px)

  # Global font settings used for all elements inside <body>.
  global:
    external: true
    family: Mulish
    size:

  # Font settings for alternate title.
  logo:
    external: true
    family: Fredericka the Great
    size: 3.5

  # Font settings for site title.
  title:
    external: true
    family: Noto Serif JP
    size: 2.5

  # Font settings for headlines (<h1> to <h6>).
  headings:
    external: true
    family: Noto Serif SC
    size:

  # Font settings for posts.
  posts:
    external: true
    family:

  # Font settings for <code> and code blocks.
  codes:
    external: true
    family: Inconsolata
```
此功能基本参考NexT。
加粗标题的字体总是使用`Noto Serif`，为了正确友好的显示日文中的汉字，会先后加载`headings`和`title`的字体设置。

# 夜间模式
```yml
darkmode: # true
```
默认情况下，是否开启夜间模式取决于（优先级从高到低）：
1. 访客点击页面头部切换按钮的自行选择
2. 访客切换了浏览设备的主题色调
3. 您的`darkmode`配置项

# 自动定位
```yml
autoScroll: # false
```
默认情况下，再次打开页面时，会自动滚动到上次浏览的位置。
这个选项设为`false`时将停用此功能。


# 加载动画
```yml
# 是否显示页面加载动画loading-cat
loader:
  start: true # 当初次打开页面时，显示加载动画
  switch: true # tab切换到其他页面时，显示加载动画
```

tab切换后只是显示loading动画，实际并未重新加载页面

# 边栏位置

边栏可以选择在左侧，或右侧

```yml
sidebar:
  # Sidebar Position.
  position: left
  #position: right
```

# 菜单与社交按钮icon
这里没有直接使用Font Awesome，是因为用不到那么多icon感觉非常浪费，因此在Iconfont上重新建立了一个项目。
`font-family`设为`ic`，所有字体样式前缀为`i-`，具体参见`themes/shoka/source/css/scaffolding/iconfont.styl`。
全部图标预览可以打开`themes/shoka/source/css/_common/scaffolding/icon/demo_index.html`文件查看。

```yml
menu:
  home: / || home
  about: /about/ || user
  posts:
    default: / || feather
    archives: /archives/ || list-alt
    categories: /categories/ || th
    tags: /tags/ || tags
  # friends: /friends/ || heart
  # links: /links/ || magic

social:
  github: https://github.com/yourname || github || "#191717"
  #google: https://plus.google.com/yourname || google
  twitter: https://twitter.com/yourname || twitter || "#00aff0"
  zhihu: https://www.zhihu.com/people/yourname || zhihu || "#1e88e5"
  music: https://music.163.com/#/user/home?id=yourid || cloud-music || "#e60026"
  weibo: https://weibo.com/yourname || weibo || "#ea716e"
  about: https://about.me/yourname || address-card || "#3b5998"
  #email: mailto:yourname@mail.com || envelope || "#55acd5"
  #facebook: https://www.facebook.com/yourname || facebook
  #stackoverflow: https://stackoverflow.com/yourname || stack-overflow
  #youtube: https://youtube.com/yourname || youtube
  #instagram: https://instagram.com/yourname || instagram
  #skype: skype:yourname?call|chat || skype
  #douban: https://www.douban.com/people/yourname/ || douban
```
如上，使用`||`作为分隔符，依次为 `链接 || 图标 || 颜色`。
注意，只需要写图标名称，如`github`，则会自动转换为`ic i-github`。
十六进制颜色码需要`""`包绕。

`menu` 支持一级子目录，子目录设置中的第一项必须为`default`，用来定义父级按钮的样式。

菜单显示文字可以在语言包中定义，[具体请戳这里](/computer-science/note/theme-shoka-doc/display/#自定义语言包)

# 图片修改
位于`<root>/themes/shoka/source/images/`目录里的图片们都是可以修改的。

1. 修改头像 `avatar.jpg` 
  如果要设置不同的文件名，请在主题`_config.yml`修改
  ```yml
  sidebar:
    # Replace the default avatar image and set the url here.
    avatar: avatar.jpg
  ```

2. 修改打赏二维码文件，共三个

3. 修改 `favicon.ico`和`apple-touch-icon.png`


# 随机图库
- 默认情况下
  图片列表位于`<root>/themes/shoka/_images.yml`中。
  使用了渣浪图库，使用一些上传工具，比如[这里](https://pic.gimhoy.com/)
  上传后图片的链接是`http://wx4.sinaimg.cn/large/6833939bly1gicmnywqgpj20zk0m8dwx.jpg`。
  只需要增加一行，写上`- 6833939bly1gicmnywqgpj20zk0m8dwx.jpg`。

- 也可以直接在图片列表yml文件中，写上任意外链图片地址
```yml
- https://i.loli.net/2020/10/30/qAMYEFXxJcKRsiG.gif
- https://i.loli.net/2020/10/30/rjdhcSgEN8COBPA.jpg
- https://i.loli.net/2020/10/30/HKyzSd7NI3mlBpt.jpg
- https://i.loli.net/2020/10/30/Y1CBXqgeokEs457.jpg
- https://i.loli.net/2020/10/30/Z5W6r2BSoiThHG1.jpg
```

- 也可以在主题`_config.yml`文件中设置图床API：
```yml 比如
image_server: "https://acg.xydwz.cn/api/api.php"
```

# 背景音乐
在主题`_config.yml`文件中设置全局播放列表。
在文章的 Front Matter 中，设置文章专有播放列表，访问该文章页面时，将覆盖全局配置。

```yml 单列表
audio:
  - https://music.163.com/song?id=1387098940
  - https://music.163.com/#/playlist?id=2088001742
  - https://www.xiami.com/collect/250830668
  - https://y.qq.com/n/yqq/playsquare/3535982902.html
```
如上，可以直接使用网易云、虾米、QQ音乐的播放列表、单曲，可以同时填写多个。

```yml 多列表
audio:
  - title: 列表1
    list:
      - https://music.163.com/#/playlist?id=2943811283
      - https://music.163.com/#/playlist?id=2297706586
  - title: 列表2
    list:
      - https://music.163.com/#/playlist?id=2031842656
```

如果需要自定义媒体文件，可以按照以下格式填写：

```yml 单列表
audio:
  - name: "曲目1"
    url: "播放地址"
    artist: "艺术家"
    cover: "封面"
    lrc: "歌词"
  - name: "曲目2"
    url: "播放地址"
    artist: "艺术家"
    cover: "封面"
    lrc: "歌词"
```

```yml 多列表
audio:
    - title: 列表1
      list:
        - name: "曲目1"
          url: "播放地址"
          artist: "艺术家"
          cover: "封面"
          lrc: "歌词"
        - name: "曲目2"
          url: "播放地址"
          artist: "艺术家"
          cover: "封面"
          lrc: "歌词"
    - title: 列表2
      list:
        - https://music.163.com/#/playlist?id=2031842656
```

# 文章字数及阅读时间统计

安装好hexo-symbols-count-time插件后，不需要修改站点配置文件，直接使用插件默认配置就行。

需要修改主题配置文件，找到两处`cout`，修改为`true`：

```yml
# 文章字数统计
post:
  count: true

# 页尾全站统计
footer:
  since: 2010
  count: true
```

# 文章评论
在主题`_config.yml`文件中设置好LeanCloud的appId和appKey，[如何获取戳此](https://valine.js.org/quickstart.html)。

```yml
valine:
  appId: #Your_appId
  appKey: #Your_appkey
  placeholder: ヽ(○´∀`)ﾉ♪ # Comment box placeholder
  avatar: mp # Gravatar style : mp, identicon, monsterid, wavatar, robohash, retro
  pageSize: 10 # Pagination size
  lang: zh-CN
  visitor: true # 文章访问量统计
  NoRecordIP: false # 不记录IP
  serverURLs: # When the custom domain name is enabled, fill it in here (it will be detected automatically by default, no need to fill in)
  powerMode: true # 默认打开评论框输入特效
  tagMeta:
    visitor: 新朋友
    master: 主人
    friend: 小伙伴
    investor: 金主粑粑
  tagColor:
    master: "var(--color-orange)"
    friend: "var(--color-aqua)"
    investor: "var(--color-pink)"
  tagMember:
    master:
      # - hash of master@email.com
      # - hash of master2@email.com
    friend:
      # - hash of friend@email.com
      # - hash of friend2@email.com
    investor:
      # - hash of investor1@email.com
```

tag标签显示在评论者名字的后面，默认是`tagMeta.visitor`对应的值。
在`tagMeta`和`tagColor`中，除了`visitor`这个key不能修改外，其他key都可以换一换，但需要保证一致性。

```yml 举个栗子
  tagMeta:
    visitor: 游客
    admin: 管理员
    waifu: 我老婆
  tagColor:
    visitor: "#855194"
    admin: "#a77c59"
    waifu: "#ed6ea0"
  tagMember:
    admin:
      # - hash of admin@email.com
    waifu:
      # - hash of waifu@email.com
```

在文章Front Matter中也可以配置上述参数，访问该文章页面时，将覆盖全局配置。
尤其可以用来配置一个特殊的placeholder。

```yml
valine:
  placeholder: "1. 提问前请先仔细阅读本文档⚡\n2. 页面显示问题💥，请提供控制台截图📸或者您的测试网址\n3. 其他任何报错💣，请提供详细描述和截图📸，祝食用愉快💪"
---
```

评论通知与管理工具建议使用这个[Valine-Admin](https://github.com/DesertsP/Valine-Admin)。
注意`SITE_URL`需要以`/`结尾。

# 页面特效
除了上述评论框的输入特效，单击页面的烟花效果配置如下

```yml
fireworks:
  enable: true # 是否启用
  color: # 烟花颜色
    - "rgba(255,182,185,.9)"
    - "rgba(250,227,217,.9)"
    - "rgba(187,222,214,.9)"
    - "rgba(138,198,209,.9)"
```

# 加载第三方组件
```yml
vendors:
  css:
    # 略略略
  js:
    # 略略略
```
包括

--|--|--
`pace` | 加载进度条|全局
`pjax` | 页面无刷新加载|全局
`anime` | js动画效果|全局
`algolia` `instantsearch`| 基于algolia的站内搜索|全局
`lazyload` | 图片懒加载|全局
`quicklink` | 链接资源预加载|全局
`fetch` | 获取播放列表|全局
`katex` `copy_tex`|数学公式显示及复制|按需
`fancybox` | 图片放大显示及排列|按需
`valine` | 基于LeanCloud的评论系统及文章阅读次数统计|按需
`chart` | 图表显示|按需

以上文件加载全部基于jsDelivr，并对全局加载的组件进行了文件合并。
如果不明白啥意思，则不要轻易修改。

:::danger
主题版本升级的时候，可能会修改这里。
如果修改过主题默认`_config.yml`，记得更新主题时，末尾的`vendors`也要及时修改。
:::
