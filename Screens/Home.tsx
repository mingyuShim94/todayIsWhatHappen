import React, { useEffect, useState, useRef } from "react";
import {
  Animated,
  Pressable,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useQuery } from "react-query";
import { trendInfo, TrendResponse } from "../api";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
const bannerAdUnitId = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-8647279125417942/7503277814";
import colorList from "../assets/colorRainbow";

const randomColor = colorList.sort(() => Math.random() - 0.5);
const WindowWidth = Dimensions.get("window").width;

type ObjType = {
  [index: string]: number;
};
const trafficToFont: ObjType = {
  "500,000+": 0.18 * WindowWidth,
  "100,000+": 0.15 * WindowWidth,
  "50,000+": 0.13 * WindowWidth,
  "20,000+": 0.1 * WindowWidth,
  "10,000+": 0.08 * WindowWidth,
  "5,000+": 0.06 * WindowWidth,
  "2,000+": 0.03 * WindowWidth,
  "1,000+": 0.01 * WindowWidth,
};
const Home: React.FC<NativeStackScreenProps<any, "오늘is뭔들">> = ({
  navigation,
}) => {
  const scaleTextBtn = useRef(new Animated.Value(1)).current;
  const scaleArr = useRef(
    Array.from({ length: 20 }, (v, i) => new Animated.Value(1))
  ).current;

  const { isLoading: trendLoading, data: trendData } = useQuery<TrendResponse>(
    "trendInfo",
    trendInfo
  );
  //console.log(trendData?.json.length);
  return trendLoading ? (
    <Loader>
      <ActivityIndicator size="large" color="white" />
    </Loader>
  ) : (
    <WindowContainer>
      <Container>
        <ReactNativeZoomableView
          maxZoom={1.3}
          minZoom={0.85}
          initialZoom={1}
          bindToBorders={true}
          doubleTapZoomToCenter={true}
          style={{
            padding: 10,
            backgroundColor: "black",
            flexDirection: "row",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "space-around",
          }}
        >
          {trendData?.shuffleJson.map((trend: any, index: number) => (
            <TextBtn
              key={index}
              style={{ transform: [{ scale: scaleArr[index] }] }}
              onPressIn={() => {
                scaleArr[index].setValue(0.8);
              }}
              onPress={() => {
                navigation.navigate("뉴스", { data: trend });
              }}
              onPressOut={() => {
                scaleArr[index].setValue(1);
              }}
            >
              <TrendKeyword
                style={{
                  fontSize: trafficToFont[trend["ht:approx_traffic"][0]],
                  color: randomColor[index],
                  marginLeft: Math.floor(Math.random() * 15) + 1,
                  marginRight: Math.floor(Math.random() * 15) + 1,
                  marginTop: Math.floor(Math.random() * 15) + 1,
                  marginBottom: Math.floor(Math.random() * 15) + 1,
                }}
              >
                {trend.title[0]}
              </TrendKeyword>
            </TextBtn>
          ))}
        </ReactNativeZoomableView>
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

export default Home;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;
const WindowContainer = styled.View`
  flex: 1;
  background-color: black;
`;
const Container = styled.View`
  flex: 0.9;
  background-color: black;
`;

const TextBtn = styled(Animated.createAnimatedComponent(Pressable))``;

const TrendKeyword = styled.Text`
  font-family: "SF_HambakSnow";
`;
const AdsContainer = styled.View`
  flex: 0.1;
  justify-content: flex-end;
`;
