import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  backgroundColor: black;
  flex:1;
`;
const KeywordTitle = styled.Text`
  color: white;
  margin-top: 7px;
  margin-left : 10px;
  font-family : Tmon;
  font-size : 20;
`;
const Traffic = styled.Text`
  color: white;
  margin-top: 7px;
  margin-left : 10px;
  font-family : Tmon;
  font-size : 20;
`;
const PubDate = styled.Text`
  color: white;
  margin-top: 7px;
  margin-left : 10px;
  font-family : Tmon;
  font-size : 20;
`;
const Info = (params) => {
  const keyword = params.data.title[0];
  const traffic = params.data['ht:approx_traffic'][0];
  const pubDate = params.data.pubDate[0];
  return (
    <Container>
      <KeywordTitle>{keyword}</KeywordTitle>
      <Traffic>{traffic}</Traffic>
      <PubDate>{pubDate}</PubDate>
    </Container>
  );
};

export default Info;
