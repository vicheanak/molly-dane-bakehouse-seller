import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebaseConfig';
import { getDatabase, ref, set, onValue } from "firebase/database";

const HomePage = () => {

  const incrementByOne = () => {
    const db = FIREBASE_DB;
    const d1 = new Date();
    
    set(ref(db, 'users/' + d1.getTime()), {
      'test': 1,
      'desc': 'Good'
    });
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Link href="/home/settings">Push Setting</Link>
      <Button onPress={ () => {
        incrementByOne();
      }} title="Increment"></Button>
    </View>
  )
}

export default HomePage