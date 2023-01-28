import React from "react";
import { View, Text, ActivityIndicator, Image, Dimensions } from "react-native";
import styled from "styled-components/native";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Modal from "react-native-modal";
import { decode } from "html-entities";
import { crawlImage } from "../util/NewsCrawl";
import * as WebBrowser from "expo-web-browser";
const WindowWidth = Dimensions.get("window").width;
const WindowHeight = Dimensions.get("window").height;
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useInterstitialAd,
} from "react-native-google-mobile-ads";
const bannerAdUnitId = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-8647279125417942/7503277814";
const interAdUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-8647279125417942/7107857884";

const News: React.FC<NativeStackScreenProps<any, "뉴스">> = ({ route }) => {
  let articleUrl = route.params?.data["ht:news_item"][0]["ht:news_item_url"][0];
  if (articleUrl.includes("http") === false)
    articleUrl = `https://${articleUrl}`;
  const title = route.params?.data["ht:news_item"][0]["ht:news_item_title"][0];
  const keyword = route.params?.data.title[0];
  const snippetTitle =
    route.params?.data["ht:news_item"][0]["ht:news_item_snippet"][0];
  const { isLoading: newsImageLoading, data: newsImage } = useQuery(
    ["crawlImage", keyword],
    () => crawlImage(articleUrl)
  );
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const openArticleLink = async () => {
    await WebBrowser.openBrowserAsync(articleUrl);
  };
  const {
    isLoaded: interIsLoaded,
    isClosed: interIsClosed,
    load: interLoad,
    show: interShow,
  } = useInterstitialAd(interAdUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });
  useEffect(() => {
    // console.log("interLoad!!", interIsLoaded);
    interLoad();
  }, [interLoad]);

  useEffect(() => {
    if (interIsClosed) {
      console.log("InterClose!!");
      interLoad();
    }
  }, [interIsClosed]);
  console.log("interLoad!!", interIsLoaded);
  return newsImageLoading ? (
    <Loader>
      <ActivityIndicator size="large" color="white" />
    </Loader>
  ) : (
    <WindowContainer>
      <Container>
        <KeywordTitle>{keyword}</KeywordTitle>
        <PressView onPress={() => setImageModalVisible(true)}>
          <Image
            style={{
              width: WindowWidth,
              height: WindowHeight / 3.024,
              resizeMode: "contain",
            }}
            source={{ uri: newsImage }}
          />
        </PressView>

        <Title>{decode(title)}</Title>
        <SnippetTitle>{decode(snippetTitle)}</SnippetTitle>
        {interIsLoaded ? (
          <ArticleBtn
            onPress={() => {
              openArticleLink();
              interShow();
            }}
          >
            <FontAwesome
              name="newspaper-o"
              size={WindowWidth / 8.2285}
              color="white"
            />
            <ArticleBtnText>{"기사 링크"}</ArticleBtnText>
          </ArticleBtn>
        ) : null}

        <Modal
          isVisible={isImageModalVisible}
          backdropOpacity={0.7}
          useNativeDriver={true}
          animationIn={"zoomIn"}
          animationOut={"zoomOut"}
          onBackButtonPress={() => {
            setImageModalVisible(false);
          }}
          onBackdropPress={() => {
            setImageModalVisible(false);
          }}
        >
          <ImageModal>
            <ReactNativeZoomableView
              maxZoom={1.5}
              minZoom={1}
              initialZoom={1}
              bindToBorders={true}
            >
              <PressView
                onPress={() => {
                  setImageModalVisible(false);
                }}
              >
                <Image
                  style={{
                    width: WindowWidth,
                    height: WindowHeight,
                    resizeMode: "contain",
                  }}
                  source={{ uri: newsImage }}
                />
              </PressView>
            </ReactNativeZoomableView>
          </ImageModal>
        </Modal>
      </Container>
      <AdsContainer>
        <BannerAd
          unitId={bannerAdUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </AdsContainer>
    </WindowContainer>
  );
};
export default News;

const WindowContainer = styled.View`
  flex: 1;
  background-color: black;
`;

const Container = styled.View`
  background-color: black;
  flex: 0.9;
`;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;
const KeywordTitle = styled.Text`
  color: white;
  margin-top: ${WindowHeight / 8.1657}px;
  margin-left: ${WindowHeight / 81.657}px;
  margin-bottom: ${WindowHeight / 163.3142}px;
  font-size: ${WindowWidth / 20.5714}px;
  font-weight: bold;
`;
const Title = styled.Text`
  color: white;
  font-size: ${WindowWidth / 20.5714}px;
  margin-top: ${WindowHeight / 116.653}px;
  margin-left: ${WindowWidth / 41.4285}px;
  font-weight: bold;
`;
const SnippetTitle = styled.Text`
  color: white;
  margin-top: ${WindowHeight / 54.438}px;
  margin-left: ${WindowWidth / 41.14285}px;
  margin-bottom: ${WindowHeight / 27.219}px;
`;
const ArticleBtn = styled.TouchableOpacity`
  align-items: center;
`;
const ArticleBtnText = styled.Text`
  color: white;
  margin-top: ${WindowHeight / 272.1904}px;
`;

const ImageModal = styled.View`
  justify-content: center;
  align-items: center;
  background-color: black;
  align-self: center;
  align-items: center;
`;

const PressView = styled.Pressable``;
const AdsContainer = styled.View`
  flex: 0.1;
  justify-content: flex-end;
`;
