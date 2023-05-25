import { StyleSheet, Text, View, TextInput, ActivityIndicator, Alert, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Stack, useRouter } from "expo-router";


const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const router = useRouter();

    const signIn = async () => {
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            router.replace("/(tabs)/home");
        } catch (error) {
            Alert.alert("Sign In Failed");
            console.log(error);
        } finally {
            setLoading(false);

        }
    }

    const signUp = async () => {
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            Alert.alert("Check your email");
        } catch (error) {
            Alert.alert("Signed Up Failed", error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
                <TextInput style={styles.input}
                    value={email}
                    placeholder="Email" 
                    autoCapitalize="none"
                    onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput style={styles.input}
                    secureTextEntry={true}
                    value={password}
                    placeholder="Password" 
                    autoCapitalize="none"
                    onChangeText={(text) => setPassword(text)}></TextInput>
                
                {loading ? 
                <ActivityIndicator size="large" color="#000000" /> 
                : <>
                <Button title="Login" onPress={signIn} />
                <Button title="Signup" onPress={signUp} />
                </>}
            </KeyboardAvoidingView>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
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