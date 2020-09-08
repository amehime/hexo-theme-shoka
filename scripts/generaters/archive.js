'use strict';

const pagination = require('hexo-pagination');

const fmtNum = num => {
  return num < 10 ? '0' + num : num;
};

if (!(hexo.config.archive && hexo.config.archive.enabled === false)) {
  // when archive disabled pagination, per_page should be 0.
  let per_page;

  if (hexo.config.archive === 1) {
    per_page = 0;
  } else if (typeof hexo.config.per_page === 'undefined') {
    per_page = 10;
  } else {
    per_page = hexo.config.per_page;
  }

  hexo.config.archive_generator = Object.assign({
    per_page: per_page,
    yearly: true,
    monthly: true,
    daily: false
  }, hexo.config.archive_generator);


  hexo.extend.generator.register('archive', function(locals) {
    const config = hexo.config;
    let archiveDir = config.archive_dir;
    const paginationDir = config.pagination_dir || 'page';
    const allPosts = locals.posts.sort(config.archive_generator.order_by || '-date');
    const perPage = config.archive_generator.per_page;
    let result = [];

    if (!allPosts.length) return;

    if (archiveDir[archiveDir.length - 1] !== '/') archiveDir += '/';

    function generate(path, posts, options) {
      options = options || {};
      options.archive = true;

      result = result.concat(pagination(path, posts, {
        perPage: path === archiveDir? 0 : perPage,
        layout: ['archive', 'index'],
        format: paginationDir + '/%d/',
        data: options
      }));
    }

    generate(archiveDir, allPosts);

    if (!config.archive_generator.yearly) return result;

    const posts = {};

    // Organize posts by date
    allPosts.forEach(post => {
      const date = post.date;
      const year = date.year();
      const month = date.month() + 1; // month is started from 0

      if (!Object.prototype.hasOwnProperty.call(posts, year)) {
        // 13 arrays. The first array is for posts in this year
        // and the other arrays is for posts in this month
        posts[year] = [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ];
      }

      posts[year][0].push(post);
      posts[year][month].push(post);
      // Daily
      if (config.archive_generator.daily) {
        const day = date.date();
        if (!Object.prototype.hasOwnProperty.call(posts[year][month], 'day')) {
          posts[year][month].day = {};
        }

        (posts[year][month].day[day] || (posts[year][month].day[day] = [])).push(post);
      }
    });

    const Query = this.model('Post').Query;
    const years = Object.keys(posts);
    let year, data, month, monthData, url;

    // Yearly
    for (let i = 0, len = years.length; i < len; i++) {
      year = +years[i];
      data = posts[year];
      url = archiveDir + year + '/';
      if (!data[0].length) continue;

      generate(url, new Query(data[0]), {year: year});

      if (!config.archive_generator.monthly && !config.archive_generator.daily) continue;

      // Monthly
      for (month = 1; month <= 12; month++) {
        monthData = data[month];
        if (!monthData.length) continue;
        if (config.archive_generator.monthly) {
          generate(url + fmtNum(month) + '/', new Query(monthData), {
            year: year,
            month: month
          });
        }

        if (!config.archive_generator.daily) continue;

        // Daily
        for (let day = 1; day <= 31; day++) {
          const dayData = monthData.day[day];
          if (!dayData || !dayData.length) continue;
          generate(url + fmtNum(month) + '/' + fmtNum(day) + '/', new Query(dayData), {
            year: year,
            month: month,
            day: day
          });
        }
      }
    }

    return result;

  });
}
