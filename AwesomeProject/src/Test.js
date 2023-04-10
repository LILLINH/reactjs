import { Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React,{useState} from 'react'


const Test = (props) => {
    const{ navigation }=props;
    const [pass, setpass] = useState("");
    const [user, setuser] = useState("")

    const checkform = () => {
        if(user=='' && pass==''){
            
            ToastAndroid.show('nhập email pass vào', ToastAndroid.SHORT);
            
        }else{
            
            ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
            
            navigation.navigate('Flatlist')
            
        }
        
      
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.WelcomeText}>Welcome back to{'\n'}Mega Mall</Text>
                <Text style={styles.Text1}>Silahkan masukan data untuk login </Text>
                <Text style={styles.TextInput}>Email/ Phone</Text>
                <TextInput style={styles.input} placeholder='Masukan Alamat Email/ No Telepon Anda'
                onChangeText={setuser}>

                </TextInput>
                <Text style={styles.TextInput} >Password</Text>
                <TextInput style={[styles.input, { marginBottom: 86 }]} placeholder='Masukan Kata Sandi Akun' 
                onChangeText={setpass}>

                </TextInput>
                <Pressable style={styles.Signin} onPress={checkform}>
                    <Text style={styles.Text2}>
                        Sign in
                    </Text>
                </Pressable>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 104, marginBottom: 30, }}>

                    <Text style={{ color: '#0C1A30' }}>Forgot Password</Text>

                    <Text style={{ color: '#3669C9' }}>Sign Up</Text>

                </View>
            </View>
        </ScrollView>

    )
}

export default Test

const styles = StyleSheet.create({
    container: {
        marginTop: 72,
        marginLeft: 25,
        marginRight: 25,
    },
    WelcomeText: {
        color: '#0C1A30',
        fontWeight: '700',
        width: 325,
        height: 66,
        fontFamily: 'DM Sans',
        fontSize: 25,
        marginBottom: 20,

    },
    Text1: {
        width: 325,
        height: 25,
        fontFamily: 'DM Sans',
        fontSize: 14,
        color: '#0C1A30',
        marginBottom: 50,
        fontWeight: '400',
    },
    TextInput: {
        width: 255.56,
        height: 19,
        fontFamily: 'DM Sans',
        fontWeight: '400',
        fontSize: 14,
        marginBottom: 20,
        color: '#0C1A30',

    },
    input: {
        backgroundColor: '#FAFAFA',
        marginBottom: 35,
    },
    Signin: {
        justifyContent: 'center',
        backgroundColor: '#3669C9',
        flexDirection: 'row',
        width: 325,
        height: 50,
        alignItems: 'center',
        borderRadius: 10,

    },
    Text2: {
        color: '#FFFFFF',

    }



})