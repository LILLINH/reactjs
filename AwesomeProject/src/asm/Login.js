import { Pressable, StyleSheet, Text, TextInput, View, Image, ScrollView, ToastAndroid } from 'react-native';
import React, { useContext, useState } from 'react';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './SignUp';
import NewDetail from './NewDetail';
import AxiosIntance from './ultil/AxiosIntance';
import { Axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from './ultil/AppContext';

export default function Login(props) {
  const { navigation } = props;
  const goToSignUp = () => {
    navigation.navigate('SignUp');

  }
  const [emailUser, setemailUser] = useState("");
  const [passwordUser, setpasswordUser] = useState("");
  const { setisLogin, setinfoUser } = useContext(AppContext);

  const dangNhap = async () => {
    try {
      const response = await AxiosIntance().post("user/login", { email: emailUser, password: passwordUser });
    
      if (response.error == false) {
        console.log(response.data.token);
        await AsyncStorage.setItem("token", response.data.token);
        ToastAndroid.show("Đăng nhập thành công", ToastAndroid.SHORT);
        setinfoUser(response.data.user);
        setisLogin(true);

      } else {
        ToastAndroid.show("Đăng nhập thât bại", ToastAndroid.SHORT);

      }
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <ScrollView style={styles.View}>
      <View style={styles.container}>
        <Text style={styles.Text}>Hello</Text>
        <Text style={[styles.Text, { color: 'blue', marginTop: 0, }]}>Again!</Text>
        <Text style={styles.welcomeText}>Welcome back you've {'\n'}been missed</Text>
        <Text>Username{<Text style={{ color: 'red' }}>*</Text>}</Text>
        <TextInput style={styles.textInput} onChangeText={setemailUser}></TextInput>
        <Text>Password{<Text style={{ color: 'red' }}>*</Text>}</Text>
        <TextInput style={[styles.textInput, { marginBottom: 10 }]} onChangeText={setpasswordUser}></TextInput>
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
            <Text style={{ paddingTop: 5 }}>Remember me</Text>
          </View>
          <Text style={{ color: 'blue', paddingTop: 5 }}>Forgot the password ?</Text>
        </View>
        <Pressable style={styles.buttonLogin} onPress={dangNhap}>
          <Text style={styles.textLogin}>Login</Text>
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
        <Text style={{ textAlign: 'center', fontFamily: 'Poppins', fontSize: 14 }}>Don't have an account ?

          <Text style={{ color: 'blue', fontWeight: 'bold' }} onPress={goToSignUp}> Sign up</Text></Text>
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  View: {
    backgroundColor: 'white'
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    marginStart: 25,
    marginEnd: 25,
    flexDirection: 'column'


  },
  Text: {
    fontFamily: 'Popins',
    fontSize: 48,
    color: 'black',

    letterSpacing: 0.12,
    fontWeight: '700',
    lineHeight: 72,



  },
  welcomeText: {
    fontFamily: 'Popins',
    fontSize: 20,
    marginTop: 5,
    color: 'grey',
    marginBottom: 40,
    fontWeight: '400',
    letterSpacing: 0.12,
    lineHeight: 30,
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
  },
  buttonLogin: {
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