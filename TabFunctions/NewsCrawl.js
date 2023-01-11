const cheerio = require('react-native-cheerio');
//'https://test.cors.workers.dev/?' +
export const crawlImage = async (webLink) => {
  const response = await fetch(webLink);
  const data = await response.text();
  const $ = cheerio.load(data);
  const image = $(`meta[property="og:image"]`).attr('content');
  // const content = $(
  //   `p[class=" article-body__content article-body__content-text | text--black text font--size-sm-18 font--size-md-18 font--primary"]`
  // );
  // console.dir(image);
  
  return image;
};
