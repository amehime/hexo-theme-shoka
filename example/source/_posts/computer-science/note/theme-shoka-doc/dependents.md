---
title: Step.1 依赖插件
date: 2020/08/13 20:46:48
categories:
- [计算机科学, 二进制杂谈, Theme Shoka Documentation]
tags:
- Hexo
- 教程
---

:::primary
[:rocket:快速开始](/computer-science/note/theme-shoka-doc/) - [**:love_letter:依赖插件**](/computer-science/note/theme-shoka-doc/dependents/) - [:pushpin:基本配置](/computer-science/note/theme-shoka-doc/config/) - [:rainbow:界面显示](/computer-science/note/theme-shoka-doc/display/) - [:unicorn:特殊功能](/computer-science/note/theme-shoka-doc/special/)
:::

:::warning
请务必将hexo-renderer-multi-markdown-it升级到最新版，目前为 0.1.3
:::

Theme Shoka依赖以下Hexo插件

插件名称|npm地址|功能|依赖程度
--|--|--|--
hexo-renderer-multi-markdown-it|[链接](https://www.npmjs.com/package/hexo-renderer-multi-markdown-it)|md文件渲染器，压缩css/js/html | 必需
hexo-autoprefixer|[链接](https://www.npmjs.com/package/hexo-autoprefixer)|给生成的css文件们添加浏览器前缀 | 必需
hexo-algoliasearch|[链接](https://www.npmjs.com/package/hexo-algoliasearch)|站内搜索功能 | 搜索按钮失灵
hexo-symbols-count-time|[链接](https://www.npmjs.com/package/hexo-symbols-count-time)|文章或站点字数及阅读时间统计 | 统计没有
hexo-feed|[链接](https://www.npmjs.com/package/hexo-feed)|生成Feed文件| Feed文件没有

> 没有正确安装以上插件的话，本主题会报错or无法正确显示or部分功能失效。
> `hexo-renderer-multi-markdown-it`请注意升级到最新版

安装完以上插件后，修改站点`_config.yml`文件，加入相关配置。

# multi-markdown-it安装与配置

## 安装

1. 安装前，记得务必卸载掉默认的`hexo-renderer-marked`，以及别的markdown文件渲染器。
    ```bash
    npm un hexo-renderer-marked --save
    # 或者
    yarn remove hexo-renderer-marked
    ```

2. 安装
    ```bash
    npm i hexo-renderer-multi-markdown-it --save
    # 或者
    yarn add hexo-renderer-multi-markdown-it
    ```

3. 如果安装缓慢，或者失败
    如报错
    ```bash
    ERROR: Failed to download Chromium r515411! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download.
    ```
    因为有一步需要下载puppeteer里的Chromium内核，基于天朝内部网络现状，这一步能不能成功要靠科学和运气，所以为了避免安装失败，需要加上`--ignore-scripts`跳过Chromium内核的下载。
    ```bash
    npm i hexo-renderer-multi-markdown-it --save --ignore-scripts
    # 或者
    yarn add hexo-renderer-multi-markdown-it --ignore-scripts
    ```
    puppeteer主要是用来渲染mermaid流程图，只要文章中不使用mermaid就没有任何问题，如果要使用mermaid建议还是想办法完全安装。

## 配置

1. 加入`markdown`配置，用来渲染md文件
```yml
markdown:
  render: # 渲染器设置
    html: false # 是否过滤 HTML 标签
    xhtmlOut: true # 使用 '/' 来闭合单标签 （比如 <br />）。
    breaks: true # 转换段落里的 '\n' 到 <br>。
    linkify: true # 将类似 URL 的文本自动转换为链接。
    typographer: 
    quotes: '“”‘’'
  plugins: # markdown-it插件设置
    - plugin:
        name: markdown-it-toc-and-anchor
        enable: true
        options: # 文章目录以及锚点应用的class名称，shoka主题必须设置成这样
          tocClassName: 'toc'
          anchorClassName: 'anchor'
    - plugin:
        name: markdown-it-multimd-table
        enable: true
        options:
          multiline: true
          rowspan: true
          headerless: true
    - plugin:
        name: ./markdown-it-furigana
        enable: true
        options:
          fallbackParens: "()"
    - plugin:
        name: ./markdown-it-spoiler
        enable: true
        options:
          title: "你知道得太多了"
```

2. 加入`minify`配置，压缩css/js/html
```yml
minify:
  html:
    enable: true
    exclude: # 排除hexo-feed用到的模板文件
      - '**/json.ejs'
      - '**/atom.ejs'
      - '**/rss.ejs'
  css:
    enable: true
    exclude:
      - '**/*.min.css'
  js:
    enable: true
    mangle:
      toplevel: true
    output:
    compress:
    exclude:
      - '**/*.min.js'
```

3. 停用默认代码高亮功能
```yml
highlight:
  enable: false

prismjs:
  enable: false
```

# autoprefixer配置建议

```yml
autoprefixer:
  exclude:
    - '*.min.css'
```

缺少这个插件，首页卡片翻转效果在部分浏览器中无法正确显示。

# algolia配置建议

```yml
algolia:
  appId: #Your appId
  apiKey: #Your apiKey
  adminApiKey: #Your adminApiKey
  chunkSize: 5000
  indexName: #"shoka"
  fields:
    - title #必须配置
    - path #必须配置
    - categories #推荐配置
    - content:strip:truncate,0,2000
    - gallery
    - photos
    - tags
```

# feed配置建议

```yml
keywords: #站点关键词，用“,”分隔

feed:
    limit: 20
    order_by: "-date"
    tag_dir: false
    category_dir: false
    rss:
        enable: true
        template: "themes/shoka/layout/_alternate/rss.ejs"
        output: "rss.xml"
    atom:
        enable: true
        template: "themes/shoka/layout/_alternate/atom.ejs"
        output: "atom.xml"
    jsonFeed:
        enable: true
        template: "themes/shoka/layout/_alternate/json.ejs"
        output: "feed.json"
```