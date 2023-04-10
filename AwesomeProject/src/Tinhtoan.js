import { View, Text, Pressable, Alert } from 'react-native'
import React from 'react'
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen'
import { useState } from 'react'

const Tinhtoan = () => {
    const [num1, setnum1] = useState( Math.floor(Math.random() * 10) + 1);
    const [num2, setnum2] = useState( Math.floor(Math.random() * 10) + 1);
    const [numkq, setnumkq] = useState(Math.floor(Math.random() * 20) + 1);
    const kq1 = () => {
        if ((num1 + num2) == numkq) {
            setnum1(Math.floor(Math.random() * 10) + 1)
            setnum2(Math.floor(Math.random() * 10) + 1)
            setnumkq(Math.floor(Math.random() * 20) + 1)
        }else(
            Alert.alert(
                "Game Over"
            )
        )
    }
    const kq2= () =>{
        if ((num1 + num2) == numkq) {
            Alert.alert(
                "Game Over"
            )
            
        }else{
            setnum1(Math.floor(Math.random() * 10) + 1)
            setnum2(Math.floor(Math.random() * 10) + 1)
            setnumkq(Math.floor(Math.random() * 20) + 1)
        }
            
        
        
    }
    return (
        <View>
            <Text style={{ color: 'red', fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}>BẠN GIỎI PHÉP CỘNG</Text>
            <Text style={{ textAlign: 'center', fontSize: 50, color: 'blue', fontWeight: 'bold' }}>
                {num1} + {num2}
                {'\n'}
                =
                {'\n'}
                {numkq}
            </Text>
            <Pressable onPress={kq1}
                style={{ backgroundColor: 'green', borderWidth: 2, borderRadius: 20, margin: 10 }}>
                <Text style={{ fontSize: 20, padding: 10, textAlign: 'center', color: 'white' }} >
                    Đúng
                </Text>
            </Pressable>
            <Pressable onPress={kq2}
                style={{ backgroundColor: 'green', borderWidth: 2, borderRadius: 20, margin: 10 }}>
                <Text style={{ fontSize: 20, padding: 10, textAlign: 'center', color: 'white' }}>
                    Sai
                </Text>
            </Pressable>
        </View>

    )
}

export default Tinhtoan