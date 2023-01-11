import * as React from 'react';
import {
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { QueryClient, QueryClientProvider } from 'react-query';
import Tabs from './Navigation/Tabs';
import Stack from './Navigation/Stacks';
import Root from './Navigation/Root';
import { setTestDeviceIDAsync } from 'expo-ads-admob';

const queryClient = new QueryClient();

export default function App() {
  const [ready, setReady] = useState(false);
  const [loaded] = useFonts({
    Tmon: require('./assets/fonts/TmonMonsori.ttf.ttf'),
  });
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    await setTestDeviceIDAsync('EMULATOR');
  };
  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
