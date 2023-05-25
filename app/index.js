import { Redirect, useRootNavigationState, useRouter, SplashScreen } from "expo-router";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from "./(tabs)/home";
import {useState, useEffect, useMemo} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { Text, View } from "react-native";
const navigationState = useRootNavigationState();
const Stack = createNativeStackNavigator();

const StartPage = () => {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user !== null){
        console.log('in')
        router.replace("/(tabs)/home");
      } else {
        router.replace("/screens/Login");
      }
    })
    // router.replace("/screens/List");
  }, [])

  return <SplashScreen />
  // return <Redirect href="/screens/Login" />
    // return <Redirect href="/home" />

  // if (user){
  //   return <Redirect href="/home" />
  // } else {
  //   return <Redirect href="/screens/Login" />
  // }

  // return {user && <Redirect href="/home" />}
  // return <View><Text>LOADING...</Text></View>;

  // <NavigationContainer>
  //   <Stack.Navigator initialRouteName="/home">
  //     <Stack.Screen name="home" component={HomePage} />
  //   </Stack.Navigator>
  // </NavigationContainer>
}

export default StartPage;