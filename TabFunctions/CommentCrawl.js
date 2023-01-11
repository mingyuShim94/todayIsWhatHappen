const cheerio = require('react-native-cheerio');

export const crawlComment = async () => {
  const response = await fetch(
    'https://test.cors.workers.dev/?' +
      'https://www.fmkorea.com/?vid=&mid=humor&category=&search_keyword=%EB%B0%9C%EB%A6%AC%EC%98%88%EB%B0%94&search_target=title_content'
  );
  const data = await response.text();
  // const $ = cheerio.load(data);
  // const image = $(`meta[property="og:image"]`).attr('content');
  // const content = $(
  //   `p[class=" article-body__content article-body__content-text | text--black text font--size-sm-18 font--size-md-18 font--primary"]`
  // );
   console.dir(data);

  return data;
};
