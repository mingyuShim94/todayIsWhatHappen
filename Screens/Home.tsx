import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useQuery } from "react-query";
import { trendInfo, TrendResponse } from "../api";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
const width = Dimensions.get("window").width;
const randomColor = require("randomcolor");

type ObjType = {
  [index: string]: number;
};
const trafficToFont: ObjType = {
  "500,000+": 0.17 * width,
  "100,000+": 0.15 * width,
  "50,000+": 0.12 * width,
  "20,000+": 0.09 * width,
  "10,000+": 0.07 * width,
  "5,000+": 0.05 * width,
  "2,000+": 0.03 * width,
  "1,000+": 0.01 * width,
};
const Home = () => {
  const { isLoading: trendLoading, data: trendData } = useQuery<TrendResponse>(
    "trendInfo",
    trendInfo
  );
  return trendLoading ? (
    <Loader>
      <ActivityIndicator size="large" color="white" />
    </Loader>
  ) : (
    <Container>
      {trendData?.json.map((trend: any, index: number) => (
        <TouchableOpacity key={index}>
          <TrendKeyword
            style={{
              fontSize: trafficToFont[trend["ht:approx_traffic"][0]],
              color: randomColor({ luminosity: "bright" }),
            }}
          >
            {trend.title[0]}
          </TrendKeyword>
        </TouchableOpacity>
      ))}
    </Container>
  );
};

export default Home;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;
const Container = styled.View`
  flex: 1;
  background-color: black;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-evenly;
  padding: 0px 20px;
`;

const AdContainer = styled.View`
  flex: 0.1;
  background-color: black;
  align-items: center;
  justify-content: center;
`;
const TrendKeyword = styled.Text`
  text-align: justify;
  font-weight: 900;
`;
