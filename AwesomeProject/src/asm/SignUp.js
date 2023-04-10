import { ScrollView, StyleSheet, Text, View, TextInput, Pressable, Image, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Axios } from 'axios';
import AxiosIntance from './ultil/AxiosIntance';

const SignUp = (props) => {
    const { navigation } = props;
    const gotoLogin = () => {
        navigation.navigate('Login');
    }
    const [email, setemailUser] = useState("");
    const [password, setpasswordUser] = useState("");
    const [name, setname] = useState("");
    const dangky = async () => {
        let data = { email, password, name }
        const fetchData = async (data) => {
            let url = 'http://172.16.97.79:3000/api/user/register';
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            const res = await response.json()
            return res;
        }
        const res = await fetchData(data);
        console.log(res)
        if (res.result) {
            navigation.navigate('Login');
            ToastAndroid.show("Đăng kí thành công", ToastAndroid.SHORT);
        }
    }


    return (
        <ScrollView style={styles.View}>
            <View style={styles.Container}>
                <Text style={styles.Text}>Hello!</Text>
                <Text style={styles.SignUpText}>Signup to get Started</Text>
                <Text>Username{<Text style={{ color: 'red' }}>*</Text>}</Text>
                <TextInput style={styles.textInput} onChangeText={setemailUser}></TextInput>
                <Text>Password{<Text style={{ color: 'red' }}>*</Text>}</Text>
                <TextInput style={[styles.textInput, { marginBottom: 10 }]} onChangeText={setpasswordUser}></TextInput>
                <Text>Name{<Text style={{ color: 'red' }}>*</Text>}</Text>
                <TextInput style={styles.textInput} onChangeText={setname}></TextInput>

                <View style={[styles.viewRemember, { justifyContent: 'space-between' }]}>
                    <View style={styles.viewRemember}>
                        <BouncyCheckbox
                            fillColor='blue'
                            innerIconStyle={{
                                width: 20,
                                height: 20,
                                borderRadius: 3
                            }}
                            iconStyle={{
                                idth: 20,
                                height: 20,
                                borderRadius: 3
                            }}
                            marginEnd={-10}
                        />
                        <Text style={{ paddingTop: 2 }}>Remember me</Text>
                    </View>
                </View>
                <Pressable style={styles.buttonLogin} onPress={dangky}>
                    <Text style={styles.textLogin}>Sign up</Text>
                </Pressable>
                <Text style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: 14 }}>or continue with</Text>
                <View style={[styles.viewRemember, { justifyContent: 'space-between' }]}>
                    <Pressable style={styles.buttonSocial}>
                        <Image style={styles.imageScoial} source={require('./image/icfb.png')} />
                        <Text >Facebook</Text>
                    </Pressable>
                    <Pressable style={styles.buttonSocial}>
                        <Image style={styles.imageScoial} source={require('./image/google.png')} />
                        <Text >Google</Text>
                    </Pressable>
                </View>
                <Text style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: 14 }}>Already have an account ? <Text style={{ color: 'blue', fontWeight: 'bold' }} onPress={gotoLogin}>Login</Text></Text>
            </View>
        </ScrollView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    View: {
        backgroundColor: 'white'
    },
    Container: {
        flex: 1,

        marginStart: 25,
        marginEnd: 25,
        flexDirection: 'column'
    },
    Text: {
        fontFamily: 'Poppins',
        fontSize: 48,
        fontWeight: '700',
        color: '#1877F2',
        lineHeight: 72,
        letterSpacing: 0.12,
        marginBottom: 5,

    },
    SignUpText: {
        fontFamily: 'Poppins',
        fontWeight: '400',
        lineHeight: 30,
        fontSize: 20,
        letterSpacing: 0.12,
        color: '#4E4B66',
        marginBottom: 65,

    },
    textInput: {
        height: 48,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 4,
        marginBottom: 4,

    },
    viewRemember: {
        flexDirection: 'row',
    }, buttonLogin: {
        height: 50,
        borderRadius: 6,
        width: 370,
        marginTop: 16,
        marginBottom: 16,
        alignItems: 'center',
        backgroundColor: 'blue',
        justifyContent: 'center',



    },
    textLogin: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Poppins',


    },

    imageScoial: {
        width: 21,
        height: 21,
        marginEnd: 10,

    },
    buttonSocial: {
        flexDirection: 'row',
        width: 174,
        height: 48,
        backgroundColor: '#EEF1F4',
        marginTop: 15,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        fontFamily: 'Poppins',

    },
})