import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Flex() {
    return (
        <View style={stylesFlex.container}>
            <View style={stylesFlex.view1}></View>
            <View style={stylesFlex.view2}></View>
            <View style={stylesFlex.view3}></View>
            <View style={stylesFlex.view4}></View>
        </View>


    )
}

const stylesFlex = StyleSheet.create({
    container: {
        backgroundColor: 'yellow',
        flex: 1,
        flexDirection: 'row'
    },
    Text: {
        fontSize: 50,
    },
    view1: {
        width: 50,
        height: 50,
        backgroundColor: 'red'
    },
    view2: {
        width: 50,
        height: 50,
        backgroundColor: 'pink'
    },
    view3: {
        width: 50,
        height: 50,
        backgroundColor: 'blue'
    },
    view4: {
        width: 50,
        height: 50,
        backgroundColor: 'black'
    },
})