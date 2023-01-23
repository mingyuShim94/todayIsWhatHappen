import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useQuery } from 'react-query';
const Tab = createBottomTabNavigator();
import News from '../Screens/News';
import Info from '../Screens/Info';
import Comment from '../Screens/Comment';
import Home from '../Screens/Home';
import Stacks from './Stacks';
import { crawlNews } from '../TabFunctions/NewsCrawl';
import { FontAwesome } from '@expo/vector-icons';
const Tabs = ({ navigation: { navigate }, route }) => {
  //console.dir(route);
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Tab.Screen
        name="뉴스"
        component={() => <News data={route.params.data} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="newspaper-o" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="홈"
        listeners={{
          tabPress: (e) => {
            navigate('Stacks', { screen: '오늘is뭔들' });
          },
        }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

    // <Tab.Screen
    //     name="정보"
    //     component={() => <Info data={route.params.data} />}
    //     options={{
    //       tabBarIcon: ({ color, size }) => (
    //         <FontAwesome name="info" size={24} color="black" />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="댓글"
    //     component={() => <Comment data={route.params.data} />}
    //     options={{
    //       tabBarIcon: ({ color, size }) => (
    //         <FontAwesome name="comments-o" size={24} color="black" />
    //       ),
    //     }}
    //   />