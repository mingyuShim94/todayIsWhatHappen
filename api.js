const GoogleTrendUrl =
  'https://test.cors.workers.dev/?https://trends.google.co.kr/trends/trendingsearches/daily/rss?geo=KR';
//https://test.cors.workers.dev/?
const parseString = require('react-native-xml2js').parseString;

export const trendInfo = async () => {
  const response = await fetch(`${GoogleTrendUrl}`);
  const xml = await response.text();
  let json;
  let shuffleJson;
  //return xml;

  parseString(xml, (err, result) => {
    json = result.rss.channel[0].item;
    shuffleJson = json.sort(() => Math.random() - 0.5);
  });

  return { json, shuffleJson };
};
