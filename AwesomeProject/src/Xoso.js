import { useState } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'

const Xoso = () => {
    const [sodudoan, setsodudoan] = useState(-1);
    const [ketqua, setketqua] = useState('Kết quả sẽ hiện thị ở đây')
    const dudoan = () => {
        let numran = Math.floor(Math.random()*100)+1;
        if(sodudoan == numran){
            setketqua('Bạn đã đoán đúng số'+numran)
        }else{
            setketqua('Bạn sai rồi, đoán lại đê')
        }
    }
    return (
        <View>
            <Text style={{ color: 'red', fontSize: 50, textAlign: 'center', fontWeight: 'bold' }}>XỔ SỐ ĐÊ</Text>
            <Text style={{ color: 'green', textAlign: 'center', fontSize: 25, fontWeight: 'bold', marginTop: 10 }}>Nhập  1 số từ 1 đến 100</Text>
            <TextInput
                onChangeText={newText => setsodudoan(newText)}
                placeholder='Nhập 1 sô'
                style={{
                    borderWidth: 5,
                    borderColor: 'blue',
                    margin: 10,
                    fontSize: 20,
                    borderRadius: 20,
                    padding: 20
                }}
            />
            <Pressable onPress={dudoan}
                style={{backgroundColor:'green',borderWidth:2,borderRadius:20,margin:10}}>
                <Text style={{fontSize:20,padding:10,textAlign:'center',color:'white'}}>
                    DỰ ĐOÁN
                </Text>
               
            </Pressable>
            <Text style={{fontSize:30,textAlign:'center',}}>
                    {ketqua}
                </Text>

        </View>
    )
}

export default Xoso