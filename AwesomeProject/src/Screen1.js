import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

const Screen1 = (props) => {
  const{navigation}=props;
  const ClickNe=()=>{
    navigation.navigate('Screen2')
  }
  return (
    <View>
      <Text>Screen1</Text>
      <Pressable style={styles.Pressable} onPress={ClickNe}>
        <Text>Go to Screen 2</Text>
      </Pressable>
    </View>
  )
}

export default Screen1

const styles = StyleSheet.create({
    Pressable:{
        height:30,
        color:'blue',
        borderRadius:10,
        backgroundColor:'red',
    },
    text:{
        color:'white',
    }
})