---
title: Step.3 界面显示
date: 2020/08/13 21:12:48
categories:
- [计算机科学, 二进制杂谈, Theme Shoka Documentation]
tags:
- Hexo
- 教程
valine:
  placeholder: "1. 提问前请先仔细阅读本文档⚡\n2. 页面显示问题💥，请提供控制台截图📸或者您的测试网址\n3. 其他任何报错💣，请提供详细描述和截图📸，祝食用愉快💪"
---

:::primary
[:rocket:快速开始](/computer-science/note/theme-shoka-doc/) - [:love_letter:依赖插件](/computer-science/note/theme-shoka-doc/dependents/) - [:pushpin:基本配置](/computer-science/note/theme-shoka-doc/config/) - [**:rainbow:界面显示**](/computer-science/note/theme-shoka-doc/display/) - [:unicorn:特殊功能](/computer-science/note/theme-shoka-doc/special/)
:::


# 首页置顶文章
在文章的Front Matter设置`sticky: true`，则该文章将显示在首页最上方的`置顶文章`列。
多篇文章按照发布时间倒序排列，不分页。

```raw
---
title: 置顶文章
sticky: true
---
```

# 首页精选分类
想要在首页显示分类翻转块，需要按照以下示例的方式，给需要显示的分类加上封面图。

1. 首先，修改站点配置：
    找到`category_map:`，配置每个分类对应的英文映射，比如：
    ```yml
    category_map:
      计算机科学: computer-science
      Java: java
      C++: cpp
      二进制杂谈: note
      计算机程序设计（C++）-西安交通大学: course-1
      零基础学Java语言-浙江大学-翁恺: course-1
      面向对象程序设计-Java语言-浙江大学-翁恺: course-2
    ```
    > 注意：hexo会自动处理路径中的特殊字符，\~\`!@#$%^&\*()-\_+=[]{}|\\;:"'<>,.?以及空格，这些全部会被替换成`-`
    > 所以避免在设置中使用上述字符，否则可导致无法抓取到目录下的`cover.jpg`
  
2. 在`<root>/source/_posts`文件夹相应的目录里，存放封面图
  例子：如 [第1周 计算](https://shoka.lostyu.me/computer-science/java/course-1/week-1/) 这篇文章。
    所处的分类是
    ```yml
    categories:
    - [计算机科学, Java, 零基础学Java语言-浙江大学-翁恺]
    ```
    现在需要在首页显示`零基础学Java语言-浙江大学-翁恺`这个分类，翻转卡片后，显示这个分类下的文章们。
    而该分类经过英文映射，它的路径将是`/computer-science/java/course-1/`。

    那么，请在`<root>/source/_posts/computer-science/java/course-1/`的目录下放置`cover.jpg`文件。
    只要`分类路径`对应的目录下**存在**`cover.jpg`文件，这个分类就会在首页显示。
    在进行`hexo g`时，本分类的封面图会自动被复制到public目录里相应的位置。

3. 事实上，为了方便文章管理，这个分类下所有文章的md文件，我都会放在`<root>/source/_posts/computer-science/java/course-1/`这个目录下。

    且站点配置文件里，永久链接设置如下
    ```yml
    permalink: :title/
    ```
    `hexo g`后，文章的html文件们将全部生成到`<root>/public/computer-science/java/course-1/`目录。
    具体可以查看[本博客的github仓库](https://github.com/amehime/shoka)。

4. 文章详情界面中的`系列文章`，显示的是与当前文章同一分类的其他文章，并按照文章名正序排序。

> o(\*￣▽￣\*)ゞ
> 其实，不设置`category_map`也可以，只要在分类路径对应的文件夹下存在`cover.jpg`文件就行。
> 现在，这项功能与`category_dir`的配置也无关，`hexo g`生成后，图片会自动被转移到`category_dir`的相关子目录下。



# 文章封面图
- 如果文章的Front Matter设置了`cover: image path`，则封面会显示这张图片。
  ```yml 举个栗子
  title: Images
  cover: assets/wallpaper-2572384.jpg
  # 或者写成
  cover: http://placehold.it/350x150.jpg
  ---
  ```
  这里`cover`的值可以是位于`source`目录里的图片文件，此处是`<root>/source/assets/wallpaper-2572384.jpg`文件，也可以是一个某网址。

- 如果文章是一个`gallery post`，即Front Matter设置了`photos`，则会封面会显示设置的第一张图片。
  ```yml 举个栗子
  title: Gallery Post
  photos:
  - assets/wallpaper-2572384.jpg
  - assets/wallpaper-2311325.jpg
  - assets/wallpaper-878514.jpg
  - http://placehold.it/350x150.jpg
  ---
  ```
  此时默认会显示第一个图片，即位于`<root>/source/assets/`目录里的`wallpaper-2572384.jpg`。

- 如果站点配置中设置了`post_asset_folder: true`，那么上述本地图片路径应为`<root>/source/_posts/文章同名的文件夹/assets/wallpaper-2572384.jpg`，当然此时`assets`目录可以省掉。

- 如果以上设置均不存在，将显示一张随机图片，[随机图库配置戳此](../config/#随机图库)。

# 图片展示与相册

在文章的Front Matter设置`fancybox: false`，可以关闭文章页的图片展示功能。
使用[Justified-Gallery](http://miromannino.github.io/Justified-Gallery/)对Gallery Post内图案进行排列。

下面介绍一些小技巧：

1. 让图案下方显示`title`的markdown代码
```raw
![这里是alt](https://tva3.sinaimg.cn/large/6833939bly1gicis081o9j20zk0m8dmr.jpg "这里是title")
```
![这里是alt](https://tva3.sinaimg.cn/large/6833939bly1gicis081o9j20zk0m8dmr.jpg "这里是title")

2. 设置图片的大小
   
```raw
![](https://tva3.sinaimg.cn/large/6833939bly1gicis081o9j20zk0m8dmr.jpg "定义图片大小-固定宽度和高度"){height="100px" width="400px"}

![](https://tva3.sinaimg.cn/large/6833939bly1gicis081o9j20zk0m8dmr.jpg "定义图片大小-固定宽度"){width="400px"}

![](https://tva3.sinaimg.cn/large/6833939bly1gicis081o9j20zk0m8dmr.jpg "定义图片大小-固定高度"){height="100px"}
```

![](https://tva3.sinaimg.cn/large/6833939bly1gicis081o9j20zk0m8dmr.jpg "定义图片大小-固定宽度和高度"){height="100px" width="400px"}

![](https://tva3.sinaimg.cn/large/6833939bly1gicis081o9j20zk0m8dmr.jpg "定义图片大小-固定宽度"){width="400px"}

![](https://tva3.sinaimg.cn/large/6833939bly1gicis081o9j20zk0m8dmr.jpg "定义图片大小-固定高度"){height="100px"}

3. 除了在Front Matter里配置`photos`可以显示相册图案列表外，还可以这样写
```raw
## 图案列表No.1
![](https://tva3.sinaimg.cn/large/6833939bly1giclfdu6exj20zk0m87hw.jpg "这里是title")
![](https://tva3.sinaimg.cn/large/6833939bly1giclflwv2aj20zk0m84qp.jpg)
![](https://tva3.sinaimg.cn/large/6833939bly1giclg5ms2rj20zk0m8u0x.jpg)
![](https://tva3.sinaimg.cn/large/6833939bly1giclhnx9glj20zk0m8npd.jpg)
{.gallery}

## 图案列表No.2
![](https://tva3.sinaimg.cn/large/6833939bly1gicitht3xtj20zk0m8k5v.jpg)
![](https://tva3.sinaimg.cn/large/6833939bly1giclil3m4ej20zk0m8tn8.jpg)
![](https://tva3.sinaimg.cn/large/6833939bly1gicljgocqbj20zk0m8e81.jpg)
![](https://tva3.sinaimg.cn/large/6833939bly1gipetfk5zwj20zk0m8e81.jpg)
{.gallery data-height="120"}
```

`data-height`用来设置每行的高度，默认为`220`

## 图案列表No.1
![](https://tva3.sinaimg.cn/large/6833939bly1giclfdu6exj20zk0m87hw.jpg "这里是title")
![](https://tva3.sinaimg.cn/large/6833939bly1giclflwv2aj20zk0m84qp.jpg)
![](https://tva3.sinaimg.cn/large/6833939bly1giclg5ms2rj20zk0m8u0x.jpg)
![](https://tva3.sinaimg.cn/large/6833939bly1giclhnx9glj20zk0m8npd.jpg)
{.gallery}

## 图案列表No.2
![](https://tva3.sinaimg.cn/large/6833939bly1gicitht3xtj20zk0m8k5v.jpg)
![](https://tva3.sinaimg.cn/large/6833939bly1giclil3m4ej20zk0m8tn8.jpg)
![](https://tva3.sinaimg.cn/large/6833939bly1gicljgocqbj20zk0m8e81.jpg)
![](https://tva3.sinaimg.cn/large/6833939bly1gipetfk5zwj20zk0m8e81.jpg)
{.gallery data-height="120"}


# 自定义页面配色
主题配色全部在`<root>/themes/shoka/source/css/_colors.styl`文件中，可以自行查看。

在`<root>/source/_data/`目录新建文件`colors.styl`，在此文件中添改样式。

> 自定义`colors.styl`文件将覆盖主题默认样式，为了避免出错，请保证原有样式名均存在，在原有样式基础上进行增删改。

主题支持在`<root>/source/_data/`目录建立三个自定义`styl`文件：

自定义文件名|对应默认样式文件|样式功能
--|--|--
`colors.styl`|`_colors.styl`|页面配色
`iconfont.styl`|`_iconfont.styl`|[图标样式](../config/#iconfont图标)
`custom.styl`| - | 任意自定义样式

# 自定义主题图片
如果想要修改主题的`<root>/themes/shoka/source/images/`目录内的某张图片，请在`<root>/source/_data/`目录新建目录`images`，并在这个文件夹中添加++同名++文件，部署时将自动覆盖主题内的默认图片。

可以用此方法自定义头像、打赏二维码等图片，并且避免覆盖更新主题时遗失自定义文件。

# 自定义语言包
本功能参考NexT，主要可以用来定义菜单等处显示的文字，且可以方便主题无脑覆盖升级。

在`<root>/source/_data/`目录新建文件`languages.yml`。

按照以下格式添加配置项：

```yml
# language
zh-CN:
  # items
  post:
    copyright:
      # the translation you perfer
      author: 本文博主
en:
  menu:
    travellings: Travellings
```

可以参考主题目录下的`example/source/_data`文件夹。

> 站点配置及文件的Front Matter中，`language`项只支持`zh-CN`、`zh-HK`、`zh-TW`、`ja`、`en`。
类似写成`zh_CN`这样是不可以的。