import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'

import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_GET_AUTH } from '../../../firebaseConfig';
import { getDatabase, ref, set, onValue, update, remove } from "firebase/database";
import {useState, useEffect, useMemo} from "react";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Chip, withTheme, lightColors } from '@rneui/themed';


const HomePage = () => {
  
  const db = FIREBASE_DB;
  const [list, setList] = useState([])
  const starCountRef = ref(db, 'users/');
  const router = useRouter();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  
  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log({data})
      setList(data);
    }, {
      onlyOnce: true
    });

    //Barcode Scanner
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();

  }, []);
  
  const handleBarCodeScanned = ({ type, data }) => {
    // setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    router.push("/home/"+1685083999703);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const incrementByOne = () => {
    
    const d1 = new Date();
    const userRef = ref(db, 'users/' + d1.getTime());
    
    // set(userRef, {
    //   'email': 'terry@gmail.com',
    //   'name': 'Terry'
    // });
    // set(userRef, {
    //   'email': 'john@gmail.com',
    //   'name': 'John'
    // });
    // set(userRef, {
    //   'email': 'vitamin@gmail.com',
    //   'name': 'Vitamin'
    // });
    // set(userRef, {
    //   'email': 'iMax@gmail.com',
    //   'name': 'Max'
    // });


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
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.barcodeContainer}
      />
      {list && Object.entries(list).map(([key, val], i) => (
        <Link href={"/home/"+key}>{val.name}</Link>
      ))}
      <Button onPress={ () => {
        incrementByOne();
      }} title="Increment"></Button>
      <Chip
        title="Left Icon Chip"
        icon={{
          name: 'bluetooth',
          type: 'font-awesome',
          size: 20,
          color: 'white',
        }}
        containerStyle={{ marginVertical: 15 }}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({
  barcodeContainer: {
      position: 'absolute',
      top: 20,
      // marginHorizontal: 20,
      // flex: 1,
      justifyContent: 'center',
      height: 300,
      width: '90%'
  },
  input: {
      marginVertical: 4,
      height: 50,
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      backgroundColor: '#fff'
  }
})