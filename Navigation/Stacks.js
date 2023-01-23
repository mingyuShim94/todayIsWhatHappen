import * as React from 'react';
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useQuery } from 'react-query';
import { trendInfo } from '../api';
import styled from 'styled-components/native';
import { useFonts } from 'expo-font';
const randomColor = require('randomcolor');
const NativeStack = createNativeStackNavigator();
import { AdMobBanner } from 'expo-ads-admob';
const width = Dimensions.get('window').width;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  backgroundColor: black;
`;
const Container = styled.View`
  flex: 1;
  backgroundColor: black;
  flexDirection:row;
  flexWrap: wrap;
  alignContent: center;
  justifyContent: space-evenly;
  padding: 0px 20px;
`;

const AdContainer = styled.View`
  flex: 0.1;
  backgroundColor: black;
  align-items: center;
  justify-content: center;
`;
const TrendKeyword = styled.Text`
  textAlign:justify;
  fontWeight:900;
`;
const trafficToFont = {
  '500,000+': 0.17 * width,
  '100,000+': 0.15 * width,
  '50,000+': 0.12 * width,
  '20,000+': 0.09 * width,
  '10,000+': 0.07 * width,
  '5,000+': 0.05 * width,
  '2,000+': 0.03 * width,
  '1,000+': 0.01 * width,
};
//
const Home = ({ navigation: { navigate } }) => {
  const [fontsLoaded] = useFonts({
    Tmon: require('../assets/fonts/TmonMonsori.ttf.ttf'),
  });
  const navigation = useNavigation();
  const { isLoading: trendLoading, data: trendData } = useQuery(
    'trendInfo',
    trendInfo
  );
  return trendLoading ? (
    <Loader>
      <ActivityIndicator size="large" color="white" />
    </Loader>
  ) : (
    <>
      <Container>
        {trendData.shuffleJson.map((trend) => (
          <TouchableOpacity onPress={() => navigate('Tabs', { data: trend })}>
            <TrendKeyword
              style={{
                fontSize: trafficToFont[trend['ht:approx_traffic'][0]],
                color: randomColor({ luminosity: 'bright' }),
                fontFamily: 'Tmon',
              }}>
              {trend.title[0]}
            </TrendKeyword>
          </TouchableOpacity>
        ))}
      </Container>
    </>
    
  );
};
const Stack = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen
      name="오늘is뭔들"
      component={Home}
      options={{
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
  </NativeStack.Navigator>
);

export default Stack;

      // <AdContainer>
      //   <AdMobBanner
      //     bannerSize="LARGE_BANNER"
      //     adUnitID="ca-app-pub-8647279125417942/7503277814" // Test ID, Replace with your-admob-unit-id
      //     servePersonalizedAds // true or false
      //     onDidFailToReceiveAdWithError={this.bannerError} />
      // </AdContainer>
