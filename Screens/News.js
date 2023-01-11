import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import { useEffect, useState } from 'react';
import { crawlImage } from '../TabFunctions/NewsCrawl';
import { useQuery } from 'react-query';
import ImageModal from 'react-native-image-modal';
import { decode } from 'html-entities';
import * as WebBrowser from 'expo-web-browser';
const WIDTH = Dimensions.get('window').width;
import { FontAwesome } from '@expo/vector-icons';
const Container = styled.View`
  backgroundColor: black;
  //alignItems: center;
  flex:1;
`;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  backgroundColor: black;
`;
const KeywordTitle = styled.Text`
  color: white;
  margin-top: 100px;
  margin-left : 10px;
  margin-bottom: 5px;
  font-family : Tmon;
  font-size : 20;
`;
const Title = styled.Text`
  color: white;
  font-size: 20;
  margin-top: 7px;
  margin-left : 10px;
  font-weight: bold;
`;
const SnippetTitle = styled.Text`
  color: white;
  margin-top: 15px;
  margin-left : 10px;
  margin-bottom: 30px;
`;
const VideoBtn = styled.TouchableOpacity`
  //justify-content: center;
  align-items: center;
`;
const BtnText = styled.Text`
  color: white;
  margin-top : 3px;
  //line-height: 24px;
  //margin-left: 10px;
`;

const News = (params) => {
  //console.dir(params.data);
  let articleUrl = params.data['ht:news_item'][0]['ht:news_item_url'][0];
  //console.dir(articleUrl);
  if (articleUrl.includes('http') === false)
    articleUrl = `https://${articleUrl}`;
  const title = params.data['ht:news_item'][0]['ht:news_item_title'][0];
  const keyword = params.data.title[0];
  const snippetTitle =
    params.data['ht:news_item'][0]['ht:news_item_snippet'][0];
  const { isLoading: newsImageLoading, data: newsImage } = useQuery(
    ['crawlImage', keyword],
    () => crawlImage(articleUrl)
  );
  console.dir(newsImage);
  const openArticleLink = async () => {
    await WebBrowser.openBrowserAsync(articleUrl);
  };

  return newsImageLoading ? (
    <Loader>
      <ActivityIndicator size="large" color="white" />
    </Loader>
  ) : (
    <Container>
      <KeywordTitle>{keyword}</KeywordTitle>
      <ImageModal
        resizeMode="contain"
        style={{
          width: WIDTH,
          height: 200,
        }}
        source={{ uri: newsImage }}
      />
      <Title>{decode(title)}</Title>
      <SnippetTitle>{decode(snippetTitle)}</SnippetTitle>
      <VideoBtn onPress={() => openArticleLink()}>
        <FontAwesome name="newspaper-o" size={50} color="white" />
        <BtnText>기사 링크</BtnText>
      </VideoBtn>
    </Container>
  );
};
export default News;
