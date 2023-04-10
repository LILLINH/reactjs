import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'


const ItemListNews = (props) => {
    const { dulieu ,navigation} =props;


    const ClickItem=()=>{
        navigation.navigate('NewDetail', {dulieu: dulieu});
    }
    return (

        <TouchableOpacity onPress={ClickItem}>
            <View style={styles.container}>
                <Image source={{ uri: dulieu.image }} style={styles.Image} />
                <View style={styles.content}>
                    <Text style={styles.textTittle}>{dulieu.name}</Text>
                    <Text numberOfLines={3}>{dulieu.price}</Text>
                    <Text>{dulieu.quantity}</Text>
                    <Text>{dulieu.category}</Text>
                </View>

            </View>
        </TouchableOpacity>

    )
}

export default ItemListNews

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    Image: {
        width: 96,
        height: 96,
        borderRadius: 10,
        backgroundColor: 'red',
        margin: 5,
    },
    textTittle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
    },
    content: {
        marginStart: 5,
        paddingRight: 5,
        width: Dimensions.get('window').width - 110,
    }
})