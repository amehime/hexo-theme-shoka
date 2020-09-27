---
title: Step.3 界面显示
date: 2020/08/13 21:12:48
categories:
- [计算机科学, 二进制杂谈, Theme Shoka Documentation]
tags:
- Hexo
- 教程
---

:::primary
[:rocket:快速开始](/computer-science/note/theme-shoka-doc/) - [:love_letter:依赖插件](/computer-science/note/theme-shoka-doc/dependents/) - [:pushpin:基本配置](/computer-science/note/theme-shoka-doc/config/) - [**:rainbow:界面显示**](/computer-science/note/theme-shoka-doc/display/) - [:unicorn:特殊功能](/computer-science/note/theme-shoka-doc/special/)
:::

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

- 如果以上设置均不存在，将显示一张随机图片。
图片取自`<root>/themes/shoka/_images.yml`中，使用渣浪图床。

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

1. 首先，修改站点的`_config.yml`
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
    > 注意：hexo会自动处理路径中的特殊字符，~\`!@#$%^&*()-_+=[]{}|\\;:"'<>,.?以及空格，这些全部会被替换成`-`
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

    且站点`_config.yml`里，永久链接设置如下
    ```yml
    permalink: :title/
    ```
    `hexo g`后，文章的html文件们将全部生成到`<root>/public/computer-science/java/course-1/`目录。
    具体可以查看[本博客的github仓库](https://github.com/amehime/shoka)。

4. 文章详情界面中的`系列文章`，显示的是与当前文章同一分类的其他文章，并按照文章名正序排序。

> o(\*￣▽￣\*)ゞ
> 其实，不设置`category_map`也可以，只要在分类路径对应的文件夹下存在`cover.jpg`文件就行。
> 现在，这项功能与`category_dir`的配置也无关，`hexo g`生成后，图片会自动被转移到`category_dir`的相关子目录下。

# 底部widgets
目前页面底部可以显示两个小部件，即`随机文章`和`最近评论`。
可以在主题`_config.yml`中配置开关。

```yml
widgets:
  random_posts: true
  recent_comments: true
```