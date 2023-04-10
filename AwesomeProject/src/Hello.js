import { View, Text, Button} from 'react-native'
import React, {useState} from 'react'

const Hello = (props) => {
    const {ten} = props;
    const [hoTen, sethoTen] = useState("ABC");

    const DoiTen = ()=>{
        if(hoTen=='ABC'){
            sethoTen('DFG');
        }
    }

    const XuLy = (luachon) => {
      if(luachon){
        console.log("Welcome FPT");
      }else{
        console.log("Good bye");
      }

    }
  return (
    <View>
      <Text>Hello World {ten}</Text>
      <Button title='Click' onPress={DoiTen}/>
      <Text>{hoTen}</Text>
      <Button title='Đúng' onPress={() => XuLy(true)}/>
      <Button title='Sai' onPress={() => XuLy(false)}/>

    </View>
  )
}

export default Hello