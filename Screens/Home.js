import React from 'react';
import { View, Text } from 'react-native';

const Home = ({ navigation: { navigate } }) =>
  navigate('Stacks', { screen: '오늘is뭔들' });
export default Home;
