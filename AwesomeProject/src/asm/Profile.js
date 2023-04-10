import { Pressable, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from './ultil/AppContext'
import { launchCamera } from 'react-native-image-picker';
import AxiosIntance from './ultil/AxiosIntance';

const Profile = () => {
  const { infoUser, setinfoUser } = useContext(AppContext);
  const capture = async () => {
    const result = await launchCamera();
    console.log(result.assets[0].uri);
    const formdata = new FormData();
    formdata.append('image', {
      uri: result.assets[0].uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    const response = await AxiosIntance("multipart/form-data").post('/media/upload', formdata);
    console.log(response.data.path);

    setinfoUser({ ...infoUser, avatar: response.data.path });
  }
  const updateProfile = async () => {
    const response = await AxiosIntance().post('users/update-profile', { name: infoUser.name, address: infoUser.address, dob: infoUser.dob, phone: infoUser.phone, avatar: infoUser.avatar })
    if (response.error == false) {
      ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Cập nhật thất bại", ToastAndroid.SHORT);
    }

  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.updateprofile}>Update Profile</Text>
        <TouchableOpacity onPress={capture}>
          {
            infoUser.avatar == ""
              ?
              <Image source={require('./image/Profile.png')} style={styles.image}></Image>
              :
              <Image source={{ uri: infoUser.avatar }} style={styles.image} />
          }
        </TouchableOpacity>


        <Text>Email Address{<Text style={{ color: 'red' }}>*</Text>}</Text>
        <TextInput style={styles.textInput} value={infoUser.email} ></TextInput>
        <Text>Fullname</Text>
        <TextInput style={styles.textInput} value={infoUser.name} onChangeText={(text) => setinfoUser({ ...infoUser, name: text })}></TextInput>
        <Text>Address</Text>
        <TextInput style={styles.textInput} value={infoUser.address} onChangeText={(text) => setinfoUser({ ...infoUser, address: text })}></TextInput>
        <Text>Date of Birth</Text>
        <TextInput style={styles.textInput} value={infoUser.dob} onChangeText={(text) => setinfoUser({ ...infoUser, dob: text })}></TextInput>
        <Text>Phone Number{<Text style={{ color: 'red' }}>*</Text>}</Text>
        <TextInput style={styles.textInput} value={infoUser.phone} onChangeText={(text) => setinfoUser({ ...infoUser, phone: text })}></TextInput>


        <Pressable style={styles.buttonLogin} onPress={updateProfile}>
          <Text style={styles.textLogin}>Update</Text>
        </Pressable>

      </View>
    </ScrollView>

  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginStart: 25,
    marginEnd: 25,
    flexDirection: 'column'
  },
  image: {
    width: 200,
    height: 200,
    marginLeft: 80,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 100
  },
  updateprofile: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: 'black',
    fontSize: 30,
  },
  textInput: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 4,
    marginBottom: 4,
  },
  buttonLogin: {
    height: 50,
    borderRadius: 6,
    width: 370,
    marginTop: 10,
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
})