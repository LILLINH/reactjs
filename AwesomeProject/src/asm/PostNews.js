import { Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import AxiosIntance from './ultil/AxiosIntance'

const PostNews = () => {
    const [image, setimage] = useState(null);
    const [title, settitle] = useState("");
    const [content, setcontent] = useState("");

    // useEffect(() => {
    //   console.log({image})
    
    //   return () => {
        
    //   }
    // }, [image])
    

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
        if (response.error == false) {
            setimage(response.data.path);
            ToastAndroid.show("Upload ảnh thành công", ToastAndroid.SHORT);
        } else {
            ToastAndroid.show("Upload ảnh thất bại", ToastAndroid.SHORT);
        }

    }
    const getImageLibrary = async () => {
        const result = await launchImageLibrary();
        console.log(result.assets[0].uri);

        const formdata = new FormData();
        formdata.append('image', {
            uri: result.assets[0].uri,
            type: 'image/jpeg',
            name: 'image.jpg',
        });
        const response = await AxiosIntance("multipart/form-data").post('/media/upload', formdata);
        console.log(response.data.path);

        if (response.error == false) {
            setimage(response.data.path);
            ToastAndroid.show("Upload ảnh thành công", ToastAndroid.SHORT);
        } else {
            ToastAndroid.show("Upload ảnh thất bại", ToastAndroid.SHORT);
        }

    }
    const dangTin = async () => {
        const response = await AxiosIntance().post("/articles", { title: title, content: content, image: image })
        if (response.error == false) {
            ToastAndroid.show("Đăng tin thành công", ToastAndroid.SHORT);

        } else {
            ToastAndroid.show("Đăng tin thất bại", ToastAndroid.SHORT);

        }
    }
    
    return (

        <View style={{marginLeft:10,marginRight:10}}>
            <Text style={styles.dangtin}>Create News</Text>
            
                {image ? 
                <Image style={styles.Image} source={ {uri: image} }></Image> : 
                <Image style={styles.Image} source={ require('./image/addphoto.png') }></Image>}
            
           
            <Pressable style={styles.button} onPress={capture}>
                <Text style={styles.textLogin}>
                    Chụp ảnh
                </Text>
            </Pressable>
            <Pressable style={styles.button} onPress={getImageLibrary}>
                <Text style={styles.textLogin}>
                    Chọn ảnh từ thư viện
                </Text>
            </Pressable>
            <TextInput placeholder='Tiêu đề' onChangeText={settitle} style={styles.textInput}></TextInput>
            <TextInput placeholder='Nội dung' onChangeText={setcontent} style={styles.textInput}></TextInput>
            <Pressable style={styles.button}>
                <Text style={styles.textLogin} onPress={dangTin}>Đăng tin</Text>
            </Pressable>
        </View>
    )
}

export default PostNews

const styles = StyleSheet.create({
    dangtin: {
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: 'black',
        fontSize: 30,

    },
    Image: {
       margin:5
    },
    button: {
        height: 50,
        borderRadius: 6,
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: 'blue',
        justifyContent: 'center',
    },
    textLogin: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Poppins',


    },
    textInput: {
        height: 48,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 4,
        
      },
})