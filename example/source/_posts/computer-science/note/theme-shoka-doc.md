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
---

:::info
跳票N久终于更新的简单的使用说明
- [hexo-theme-shoka](https://github.com/amehime/hexo-theme-shoka) ：本博客自用的主题
- [hexo-renderer-multi-markdown-it](https://github.com/amehime/hexo-renderer-multi-markdown-it)：配套的markdown渲染器

已经支持hexo 5。。。本文档和bug不定期更新中。
如果有什么功能需求，欢迎留言。
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
由于本人太懒，这条暂时没有。