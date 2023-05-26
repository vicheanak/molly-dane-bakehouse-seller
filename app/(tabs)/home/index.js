import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_GET_AUTH } from '../../../firebaseConfig';
import { getDatabase, ref, set, onValue, update, remove } from "firebase/database";
import {useState, useEffect, useMemo} from "react";



const HomePage = () => {
  
  const db = FIREBASE_DB;
  const [list, setList] = useState([])
  const starCountRef = ref(db, 'users/');
  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log({data})
      setList(data);
    }, {
      onlyOnce: true
    });
  }, []);
  

  

  const incrementByOne = () => {
    
    const d1 = new Date();
    const userRef = ref(db, 'users/' + d1.getTime());
    
    set(userRef, {
      'test': 1,
      'desc': 'Good 2'
    });

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log({data})
      setList(data);
    }, {
      onlyOnce: true
    });

    // remove(ref(db, 'users'));
  }
  

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      {list && Object.entries(list).map(([key, val], i) => (
        <Link href={"/home/"+key}>{val.desc}</Link>
      ))}
      <Button onPress={ () => {
        incrementByOne();
      }} title="Increment"></Button>
    </View>
  )
}

export default HomePage