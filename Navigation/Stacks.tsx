import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Home from "../Screens/Home";
import News from "../Screens/News";
import Settings from "../Screens/Settings";
import { View } from "react-native/Libraries/Components/View/View";
const NativeStack = createNativeStackNavigator();

const Stack: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => (
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
    <NativeStack.Screen
      name="설정"
      component={Settings}
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
