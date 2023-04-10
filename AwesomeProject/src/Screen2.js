import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'

const Screen2 = (props) => {
  const{navigation}=props;
  const ClickNeNe = ()=>{
    navigation.navigate('Screen1');
  }
  return (
    <View>
      <Text>Screen2</Text>
      <Pressable style={styles.Pressable} onPress={ClickNeNe}>
        <Text>Go to Screen 1</Text>
      </Pressable>
    </View>
  )
}

export default Screen2

const styles = StyleSheet.create({
    Pressable:{
        height:30,
        color:'pink',
        borderRadius:10,
        backgroundColor:'red',
    },
    text:{
        color:'white',
    }
})