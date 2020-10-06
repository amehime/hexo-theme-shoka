---
title: Hexo主题Shoka & multi-markdown-it渲染器使用说明
date: 2020/08/13 20:45:48
update: 2020/09/27
categories:
 - [计算机科学, 二进制杂谈, Theme Shoka Documentation]
tags:
 - Hexo
 - 教程
sticky: true
valine:
  placeholder: "1. 提问前请先仔细阅读本文档⚡\n2. 页面显示问题💥，请提供控制台截图📸或者您的测试网址\n3. 其他任何报错💣，请提供详细描述和截图📸，祝食用愉快💪"
---

:::info
跳票N久终于更新的简单的使用说明
- [hexo-theme-shoka](https://github.com/amehime/hexo-theme-shoka) ：本博客自用的主题
- [hexo-renderer-multi-markdown-it](https://github.com/amehime/hexo-renderer-multi-markdown-it)：配套的markdown渲染器

已经支持hexo 5。。。本文档和bug不定期更新中。
如果有什么功能需求，欢迎留言。
:::

:::warning
当前版本更新至 0.2.2，[更新记录点此](#更新记录)
:::

:::primary
[**:rocket:快速开始**](/computer-science/note/theme-shoka-doc/) - [:love_letter:依赖插件](/computer-science/note/theme-shoka-doc/dependents/) - [:pushpin:基本配置](/computer-science/note/theme-shoka-doc/config/) - [:rainbow:界面显示](/computer-science/note/theme-shoka-doc/display/) - [:unicorn:特殊功能](/computer-science/note/theme-shoka-doc/special/)
:::

# 设计缘由
前几年在Bear和Evernote上整理了大量笔记，非常喜欢Bear默认的markdown渲染样式。
后来因为换了安卓手机，用不了Bear，四处搜寻替代品，没有满意的。
然后阴差阳错知道了Hexo，又得知Github也可以免费建私有仓库了，故再次转移阵地到了自建博客，并部署在Github Pages。

因为这个博客是用来记笔记的，故起名`书架`。
对应的主题即`Theme.Shoka`，可以说是为了笔记阅读而生的主题。
样式严重参考Bear，部分代码严重参考[NexT](https://github.com/theme-next/)。

Hexo的默认及常用渲染器均使用`highlight.js`进行代码高亮，而我喜欢`Prism.js`，故重写了一个渲染器配合主题食用。
渲染器取名`multi`，因为集成了很多很多很多`markdown-it`插件，以及压缩静态文件的功能。
（最新版的默认渲染器也支持`Prism.js`了，可喜可贺，但不想用，哈哈哈哈哈哈哈

墙内Github Pages访问速度时而感人，所以用了[jsDelivr](http://www.jsdelivr.com/)加速，主要是因为它可以按需合并依赖文件。

# 快速安装

```bash
# cd your-blog
git clone https://github.com/amehime/hexo-theme-shoka.git ./themes/shoka
```

打开主题目录，内有`example`文件夹，提供了配置文件的demo供参考。

# 安装依赖插件

在应用主题之前，必须至少安装 [hexo-renderer-multi-markdown-it](https://github.com/amehime/hexo-renderer-multi-markdown-it) 渲染插件 和 [hexo-autoprefixer](https://www.npmjs.com/package/hexo-autoprefixer)。

[插件安装与配置教程戳此](dependents/)

# 应用主题
## 修改站点配置

修改站点配置文件`<root>/_config.yml`，把主题改为 `shoka`

```yml
theme: shoka
```

## 修改主题配置
Hexo5可以在根目录新建一个yml文件，命名为`_config.shoka.yml`。
将自定义配置保存于此，方便后续主题升级。

[主题的基础配置可以参考这里](config/)

# 更新记录
标签含义：
❗ 需要手动操作的更新信息
⚠️ 需要注意的更新信息
🔧 已修复的问题

## 0.2.1 👉 0.2.2
⚠️ 弃用`mediumzoom`，改成`fancybox`，[配置戳此](display/#图片展示与相册)
💡  增加语言包：`繁体中文`和`日语`
💡  quiz功能优化，根据语言显示题型标签
🔧 修复评论功能中反复初始化leancloud-storage
🔧 修复`audio: false`时不能隐藏播放按钮、停止播放

## 0.2 👉 0.2.1
⚠️ 配置文件添加 `loader` 参数，[配置戳此](config/#加载动画)
💡  二级list区别显示
🔧 修复浏览位置定位BUG
🔧 修复firework动画延迟
🔧 优化评论功能

## 0.1.9 👉 0.2

⚠️  **评论功能大改**
- 弃用不开源的Valine，改用MiniValine，并且进行了魔改，[项目戳此](https://github.com/amehime/MiniValine)
	主要是大量压缩了代码，弃用一些花里胡哨的功能，又加了一些别的花里胡哨的功能。
- 为防止泄露用户邮箱、IP等隐私信息，弃用QQ号获取昵称及头像。
	❗ 同时需要手动进行一些迁移，[具体步骤戳此](https://github.com/imaegoo/Valine)
- ❗ 评论相关的配置亦有更新，[配置戳此](config/#文章评论)


⚠️ 增加单击页面烟花效果，[配置戳此](config/#页面特效)
💡  弃用Velocity，改用anime.js，方便未来添加更多!!花里胡哨的!!功能!!严重拖慢页面滑行速度!!
🔧 新增多枚icon，包括豆瓣`i-douban`等
🔧 一些显示问题

```info
&#123;#&#125;
<
&#123;&#123;print $1&#125;&#125;
```