import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { crawlComment } from '../TabFunctions/CommentCrawl';
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

const Comment = (params) => {
  const data = crawlComment();
  //console.dir(data); //
  const keyword = params.data.title[0];
  return (
    <Container>
      <KeywordTitle>{keyword}</KeywordTitle>
    </Container>
  );
};

export default Comment;
