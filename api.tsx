const GoogleTrendUrl =
  "https://trends.google.co.kr/trends/trendingsearches/daily/rss?geo=KR";
//https://test.cors.workers.dev/?
const parseString = require("react-native-xml2js").parseString;

// export interface Trend {
//   title: [string];
//   "ht:approx_traffic": [string];
//   description: object;
//   link: object;
//   pubDate: object;
//   "ht:picture": object;
//   "ht:picture_source": object;
//   "ht:news_item": object;
// }

export interface TrendResponse {
  json: any;
  shuffleJson: any;
}
export const trendInfo = async () => {
  const response = await fetch(`${GoogleTrendUrl}`);
  const xml = await response.text();
  let json;
  let shuffleJson;

  parseString(xml, (err: any, result: any) => {
    json = result.rss.channel[0].item;
    shuffleJson = json.sort(() => Math.random() - 0.5);
  });
  return { json, shuffleJson };
};
