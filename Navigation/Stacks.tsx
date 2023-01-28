import * as React from "react";
import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Home from "../Screens/Home";
import News from "../Screens/News";
const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen
      name="오늘is뭔들"
      component={Home}
      options={{
        headerStyle: {
          backgroundColor: "slateblue",
        },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    />
    <NativeStack.Screen
      name="뉴스"
      component={News}
      options={{
        headerStyle: {
          backgroundColor: "slateblue",
        },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    />
  </NativeStack.Navigator>
);

export default Stack;
