import { View, Text } from 'react-native';
import { Stack, useSearchParams } from 'expo-router';
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_GET_AUTH } from '../../../firebaseConfig';
import { getDatabase, ref, set, onValue, update, remove } from "firebase/database";
import {useState, useEffect, useMemo} from "react";

const HomeDetail = () => {
    const { id } = useSearchParams();
    const [detail, setDetail] = useState({});

    const db = FIREBASE_DB;
    const starCountRef = ref(db, 'users/' + id);
    useEffect(() => {
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log({data})
        setDetail(data);
      }, {
        onlyOnce: true
      });
    }, []);

    return (
        <View>
            <Stack.Screen options={{headerTitle: `Home #${id}`}} />
            <Text>My Detail {detail.desc}, test {detail.test}</Text>
        </View>
    )
}

export default HomeDetail;

