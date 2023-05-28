import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login'
import List from './app/screens/List';
import Detail from './app/screens/Detail';
import { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

const InsideLayout = () => {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="List" component={List}></InsideStack.Screen>
      <InsideStack.Screen name="Detail" component={Detail}></InsideStack.Screen>
    </InsideStack.Navigator>
  )
}

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@admin', jsonValue)
  } catch (e) {
    // saving error
  }
}


const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@admin')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

export default function App() {
  const [ user, setUser ] = useState(null);
  useEffect(async () => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('Auth State Change', user);
      setUser(user);
    })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name='Inside' component={InsideLayout} options={{headerShown: false}}></Stack.Screen>
        ) : (
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}}></Stack.Screen>
        )}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

<style type="text/css">{`
  @font-face {
    font-family: 'MaterialIcons';
    src: url(${require('react-native-vector-icons/Fonts/MaterialIcons.ttf')}) format('truetype');
  }

  @font-face {
    font-family: 'FontAwesome';
    src: url(${require('react-native-vector-icons/Fonts/FontAwesome.ttf')}) format('truetype');
  }
`}</style>
