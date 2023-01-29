import React, { useEffect, useState, useRef } from "react";
import {
  Animated,
  Pressable,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useQuery } from "react-query";
import { trendInfo, TrendResponse } from "../api";
import { useFonts } from "expo-font";
import { Entypo } from "@expo/vector-icons";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Modal from "react-native-modal";
import Share from "react-native-share";
import ViewShot from "react-native-view-shot";
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
const WindowHeight = Dimensions.get("window").height;

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
  const ref = useRef();
  const scaleTextBtn = useRef(new Animated.Value(1)).current;
  const [isShareModalVisible, setShareModalVisible] = useState(false);
  const scaleArr = useRef(
    Array.from({ length: 20 }, (v, i) => new Animated.Value(1))
  ).current;
  const scaleShareBtn = useRef(new Animated.Value(1)).current;

  const { isLoading: trendLoading, data: trendData } = useQuery<TrendResponse>(
    "trendInfo",
    trendInfo
  );
  const onShot = () => {
    ref.current.capture().then((uri: string) => {
      onShare(uri);
    });
  };
  const onShare = async (uri: "string") => {
    console.log("uri", uri);
    const shareResponse = await Share.open({ url: uri })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setShareModalVisible(true)}>
          <Entypo name="share" size={28} color="white" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return trendLoading ? (
    <Loader>
      <Image
        style={{
          width: WindowWidth,
          height: WindowHeight,
          resizeMode: "cover",
        }}
        source={require("../assets/splash.png")}
      />
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
                  marginLeft: Math.floor(Math.random() * 7) + 1,
                  marginRight: Math.floor(Math.random() * 7) + 1,
                  marginTop: Math.floor(Math.random() * 7) + 1,
                  marginBottom: Math.floor(Math.random() * 7) + 1,
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
      <Modal
        isVisible={isShareModalVisible}
        backdropOpacity={0.7}
        useNativeDriver={true}
        animationIn={"pulse"}
        onBackdropPress={() => {
          setShareModalVisible(false);
        }}
        onBackButtonPress={() => {
          setShareModalVisible(false);
        }}
      >
        <ShareModal>
          <ViewShot
            style={{
              width: WindowWidth * 0.9,
              padding: 10,
              backgroundColor: "black",
              flexDirection: "row",
              flexWrap: "wrap",
              alignContent: "center",
              justifyContent: "space-around",
              borderColor: "slateblue",
              borderWidth: 7,
              borderRadius: 20,
              alignSelf: "center",
            }}
            ref={ref}
            options={{
              fileName: "Your-File-Name",
              format: "png",
              quality: 0.9,
            }}
          >
            {trendData?.shuffleJson.map((trend: any, index: number) => (
              <TrendKeyword
                key={index}
                style={{
                  fontSize: trafficToFont[trend["ht:approx_traffic"][0]],
                  color: randomColor[index],
                  marginLeft: Math.floor(Math.random() * 7) + 1,
                  marginRight: Math.floor(Math.random() * 7) + 1,
                  marginTop: Math.floor(Math.random() * 7) + 1,
                  marginBottom: Math.floor(Math.random() * 7) + 1,
                }}
              >
                {trend.title[0]}
              </TrendKeyword>
            ))}
          </ViewShot>
        </ShareModal>
        <ShareBtn
          style={{
            transform: [{ scale: scaleShareBtn }],
          }}
          onPressIn={() => {
            scaleShareBtn.setValue(0.9);
          }}
          onPressOut={() => {
            onShot();
            scaleShareBtn.setValue(1);
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 15 }}>
            {"공유하기"}
          </Text>
        </ShareBtn>
      </Modal>
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
const ShareModal = styled.View`
  background-color: black;
  width: ${WindowWidth}px;
  align-self: center;
`;

const ShareBtn = styled(Animated.createAnimatedComponent(Pressable))`
  width: 80px;
  height: 50px;
  background-color: slateblue;
  top: 20px;
  border-radius: 25px;
  align-self: center;
  justify-content: center;
  align-items: center;
`;
