import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import { FIREBASE_AUTH } from '../../../firebaseConfig'


const ProfilePage = () => {
  const router = useRouter();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Link href="/profile/1">Profile One</Link>
      <Link href="/profile/2">Profile Two</Link>
      <Link href="/profile/3">Profile Three</Link>
      <Button onPress={() => {
        try{
          FIREBASE_AUTH.signOut();
          router.replace("/screens/Login");
        } catch(error){
          Alert.alert("error signout");
        }
        
      }} title={"Signout"} />
    </View>
  )
}

export default ProfilePage