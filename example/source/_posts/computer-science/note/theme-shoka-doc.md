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

已经支持hexo 5。
:::

:::info
因博主被学业和工作掏空，本项目已停滞更新大半年，问题也无法及时回复大家，这个悲惨状态可能还要持续半年的样子。

有很多热心小伙伴在评论区或者项目issue帮忙回答问题，非常非常感谢！

本项目是完全开源的，也有做一些example示例，大家可以随便拿随便改。
但是很抱歉，博主我暂时不能提供更多的支持，这个写的乱七八糟的文档，暂时也没有时间把它写得更专业一些。
非常对不住大家！

iconfont的添加申请，我看到留言后会尽快加上，希望各位小伙伴能看到。
:::

:::warning
当前版本更新至 0.2.5，[更新记录点此](#更新记录)

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
主题配置的所有参数在`<root>/themes/shoka/_config.yml`文件中。

为了方便主题升级，请在根目录新建一个yml文件，命名为`_config.shoka.yml`。
也就是说，所有主题的自定义配置均保存于`<root>/_config.shoka.yml`文件。

[主题的基础配置可以参考这里](config/)
[界面显示相关的配置参考这里](display/)

# 更新记录
标签含义：
❗ 需要手动操作的更新信息
⚠️ 需要注意的更新信息
🔧 已修复的问题
⌛ TODO

## 0.2.4 👉 0.2.5
💡  避免直接修改主题文件，添加各种自定义：
- [样式](display/#自定义页面配色)：包括配色、[icon](config/#iconfont图标)、其他自定义样式
- 图片：包括[主题图片](display/#自定义主题图片)、[随机图库](config/#随机图库)

🔧 修复一些BUG

## 0.2.3 👉 0.2.4
⚠️ **评论功能更新**
- MiniValine魔改版更新至beta10，修改过主题默认`_config.yml`的同学，记得更新末尾的`vendors`到最新哦
- ❗ 评论相关的配置有更新，[配置戳此](config/#文章评论)
	- 主要增加的Tag配置，现在可以各种自定义啦

⚠️ 配置新增
- 夜间模式`darkmode`，[配置戳此](config/#夜间模式)
- 自动定位`auto_scroll`，[配置戳此](config/#自动定位)
- 图床API设置`image_server`，[配置戳此](config/#随机图库)

⚠️ 背景音乐功能增强，[配置戳此](config/#背景音乐)
- 可以添加多个播放列表
- 加了一些控制按钮

⚠️ 增加`media`标签，在文章中插入音频和视频播放列表，[方法戳此](special/#media多媒体)
⌛  视频播放器有待增强（显示分段标签，字幕）

🔧 随机图库支持非渣浪图床的任意图片
🔧 还有许多小BUG

## 0.2.2 👉 0.2.3
❗ 增加主题文件外自定义语言包的功能，[配置戳此](display/#自定义语言包)
🔧 提高低版本浏览器兼容性

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
