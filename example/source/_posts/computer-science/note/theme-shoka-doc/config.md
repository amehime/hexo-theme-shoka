---
title: Step.2 基本配置
date: 2020/08/13 20:56:48
categories:
- [计算机科学, 二进制杂谈, Theme Shoka Documentation]
tags:
- Hexo
- 教程
---

:::primary
[:rocket:快速开始](/computer-science/note/theme-shoka-doc/) - [:love_letter:依赖插件](/computer-science/note/theme-shoka-doc/dependents/) - [**:pushpin:基本配置**](/computer-science/note/theme-shoka-doc/config/) - [:rainbow:界面显示](/computer-science/note/theme-shoka-doc/display/) - [:unicorn:特殊功能](/computer-science/note/theme-shoka-doc/special/)
:::

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
```
如上，使用`||`作为分隔符，依次为 `链接 || 图标 || 颜色`。
注意，只需要写图标名称，如`github`，则会自动转换为`ic i-github`。
十六进制颜色码需要`""`包绕。

`menu` 支持一级子目录，子目录设置中的第一项必须为`default`，用来定义父级按钮的样式。
菜单显示文字在`<root>/themes/shoka/languages/`语言包中定义：

```yml
menu:
  home: 首页
  posts: 文章
  archives: 归档
  categories: 分类
  tags: 标签
  about: 关于
  search: 搜索
  friends: 友達
  links: 网址
  travellings: 开往
```

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

4. 修改随机图库
  图片列表位于`<root>/themes/shoka/_images.yml`中。
  使用了渣浪图库，使用一些上传工具，比如[这里](https://pic.gimhoy.com/)
  上传后图片的链接是`http://wx4.sinaimg.cn/large/6833939bly1gicmnywqgpj20zk0m8dwx.jpg`。
  只需要增加一行，写上`- 6833939bly1gicmnywqgpj20zk0m8dwx.jpg`。

# 背景音乐
在主题`_config.yml`文件中设置全局播放列表。
在文章的 Front Matter 中，设置文章专有播放列表，访问该文章页面时，将覆盖全局配置。

```yml
audio:
  - https://music.163.com/song?id=1387098940
  - https://music.163.com/#/playlist?id=2088001742
  - https://www.xiami.com/collect/250830668
  - https://y.qq.com/n/yqq/playsquare/3535982902.html
```
如上，可以直接使用网易云、虾米、QQ音乐的播放列表、单曲，可以同时填写多个。


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
  avatar: mp # Gravatar style
  pageSize: 10 # Pagination size
  lang: zh-CN
  visitor: true # Article reading statistic
  recordIP: true # Whether to record the commenter IP
  serverURLs: # When the custom domain name is enabled, fill it in here (it will be detected automatically by default, no need to fill in)
  requiredFields:
    - nick
    - mail
  enableQQ: true
  masters: ['主人email的MD5值', '另一个email的MD5值']
  masterTag: 主人
  tips: "昵称框中填入QQ号，将自动获取QQ昵称&邮箱&头像；其他邮箱由Gavatar提供头像。"
```

# 加载第三方组件
```yml
vendors:
  css:
    katex: npm/katex@0/dist/katex.min.css
    comment: css/comment.css
  js:
    pace: npm/pace-js@1.0.2/pace.min.js
    pjax: npm/pjax@0.2.8/pjax.min.js
    fetch: npm/whatwg-fetch@3.4.0/dist/fetch.umd.min.js
    velocity: npm/velocity-animate@1.5.2/velocity.min.js
    velocity_ui: npm/velocity-animate@1.5.2/velocity.ui.min.js
    algolia: npm/algoliasearch@4/dist/algoliasearch-lite.umd.js
    instantsearch: npm/instantsearch.js@4/dist/instantsearch.production.min.js
    lazyload: npm/lozad@1/dist/lozad.min.js
    quicklink: npm/quicklink@2/dist/quicklink.umd.js
    mediumzoom: npm/medium-zoom@1.0.5/dist/medium-zoom.min.js
    valine: js/valine.js
    copy_tex: npm/katex@0/dist/contrib/copy-tex.min.js
    chart: npm/frappe-charts@1.5.0/dist/frappe-charts.min.iife.min.js
```
包括

--|--|--
`pace` | 加载进度条|全局
`pjax` | 页面无刷新加载|全局
`velocity` | js页面动画效果|全局
`algolia` `instantsearch`| 基于algolia的站内搜索|全局
`lazyload` | 图片懒加载|全局
`quicklink` | 链接资源预加载|全局
`fetch` | 获取播放列表|全局
`katex` `copy_tex`|数学公式显示及复制|按需
`mediumzoom` | 图片放大显示|按需
`valine` | 基于LeanCloud的评论系统及文章阅读次数统计|按需
`chart` | 图表显示|按需

以上文件加载全部基于jsDelivr，并对全局加载的组件进行了文件合并。
如果不明白啥意思，则不要轻易修改。