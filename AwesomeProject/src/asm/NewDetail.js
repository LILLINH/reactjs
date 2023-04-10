import { ScrollView, StyleSheet, Text, View, Image, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import ItemListNews from './ItemListNews'
import axios from 'axios'

const NewDetail = (props) => {
    const {dulieu} = props?.route?.params;
    console.log("detai",dulieu);
    // const { route } = props;
    // const { params } = route;
    const [title, settitle] = useState("")
    const [content, setcontent] = useState("")
    const [imageUrl, setimageUrl] = useState("")
    const [isLoading, setisLoading] = useState(false)

    // useEffect(() => {
    //     const getDetails = async () => {
    //         const response = await axios.get('/articles/' + params.id + '/detail');

    //         if (response.error == false) {
    //             settitle(response.data.title);
    //             setcontent(reportError.data.content);
    //             setimageUrl(response.data.image);
    //             setisLoading(false);
    //         } else {
    //             ToastAndroid.show('Lấy dữ liệu thất bại', ToastAndroid.SHORT);
    //         }

    //     }
    //     getDetails();

    //     return () => {

    //     }
    // }, [])
    return (
        // <>
        //     {
        //         isLoading == true ?
        //             <View>
        //                 <ActivityIndicator size={'large'} color='blue' />

        //             </View>
        //             :
                    <ScrollView style={styles.container}>
                        <Image style={styles.image} source={{ uri: dulieu.image }} ></Image>
                        <Text>{dulieu.name}</Text>
                        <Text>{dulieu.price}</Text>
                        {/* {
                            dataNe.map((item) => (
                                <ItemListNews key={item._id} dulieu={item} />
                            )
                            )
                        } */}
                    </ScrollView>
        //     }
        // </>

    )
}

export default NewDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    image: {
        width: 400,
        height: 200,

    },

})

