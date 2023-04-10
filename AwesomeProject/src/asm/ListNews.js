import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ItemListNews from './ItemListNews'
import AxiosIntance from './ultil/AxiosIntance';


const ListNews = (props) => {
    const { navigation } = props;
    const [dataNe, setdataNe] = useState('');
    const [isLoading, setisLoading] = useState(true);
    const [searchText, setsearchText] = useState("");


    useEffect(() => {
        const getNews = async () => {
            setisLoading(true);
            // const response = await AxiosIntance().get("/articles");
            const response = await AxiosIntance().get("product/get-all");
            console.log(response);

            if (response.result == true) {
                setdataNe(response.products);
                setisLoading(false);
            } else {
                ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT);
            }
           
        }
        getNews();
        return () => { }
    }, [])
    let timeout = null;
    const countDownSearch=(searchText)=>{
        if(timeout){
            clearTimeout(timeout);
        }
        timeout = setTimeout(() =>{
            search(searchText);
        },1000)
    }

    const search = async(searchText)=>{
        setisLoading(true);
        const response = await AxiosIntance().get("product/search-by-name?name="+searchText);
        if(response.result == true){
            setdataNe(response.products);
            setisLoading(false);
        } else{
            ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Image source={require("./image/Vector.png")}>
                    </Image>
                    <Image source={require("./image/chuong.png")}></Image>
                </View>
                <View style={styles.search}>
                    <TouchableOpacity >
                        <Image source={require("./image/search.png")}></Image>
                    </TouchableOpacity>
                    <TextInput placeholder='Search' style={{marginLeft:-200,fontSize:20}} onChangeText={(text)=> countDownSearch(text)}></TextInput>
                    <Image source={require("./image/Vector2.png")}></Image>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={{
                        color: '#000000', fontFamily: "Poppins", fontWeight: "600", fontSize: 16
                        , lineHeight: 24
                    }}>Trending</Text>
                    <Text>See all</Text>
                </View>

                <Image style={styles.image} source={require("./image/image1.png")} />

                <Text style={{ fontFamily: "Poppins", fontWeight: '400', marginBottom: 5 }}>Europe</Text>
                <Text style={{ color: "#000000", fontFamily: 'Poppins', fontSize: 16 }}>
                    Russian warship: Moskva sinks in Black Sea</Text>
                <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 20 }}>
                    <Image source={require("./image/BBC.png")} />
                    <Text style={{ fontFamily: 'Poppins', color: "#4E4B66", fontSize: 13, fontWeight: '600', marginLeft: 5 }}>BBC News</Text>
                    <Image style={{ marginLeft: 10, marginRight: 5, marginTop: 3 }} source={require("./image/clock.png")} />
                    <Text>4h ago</Text>
                    <Text style={{ marginLeft: 185 }}>...</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15 }}>
                    <Text style={{ color: 'black', fontFamily: 'Poppins', fontWeight: '600', fontSize: 16 }}>Latest</Text>
                    <Text>See all</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: 20 }}>
                    <View style={{ borderBottomColor: 'blue', borderBottomWidth: 3 }}>
                        <Text>All</Text>
                    </View>
                    <Text>Sports</Text>
                    <Text>Politics</Text>
                    <Text>Bussiness</Text>
                    <Text>Health</Text>
                    <Text>Travel</Text>
                    <Text>Science</Text>
                </View>

                <View>
                    {isLoading == true ? (
                        <View>
                            <ActivityIndicator size='large' color='green' />
                        </View>

                    ) : 
                        // <FlatList
                        //     data={dataNe}
                        //     horizontal
                        //     renderItem={({ item }) => <ItemListNews dulieu={item} navigation={navigation} />}
                        //     keyExtractor={item => item._id}
                        //     showsVerticalScrollIndicator={false}

                        // />
                        dataNe.map((item) => <ItemListNews key={item._id} dulieu={item} navigation={navigation} />
                    )

                    }
                </View>
            </ScrollView>

        </View>





    )
}

export default ListNews

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginStart: 25,
        marginEnd: 25,
        flexDirection: 'column'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 60,
        marginBottom: 40,

    },
    search: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth:1,
        borderRadius:6,
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10,
        marginBottom:10
    },
    image: {
        marginTop: 10,
        borderRadius: 15,
        marginBottom: 10,
    },
})

// const dataNe = [
//     {
//         "_id": "1",
//         "title": "Trường công lập đầu tiên dạy và thi chương trình dự bị đại học Mỹ",
//         "content": "Phổ thông Năng khiếu là trường công lập đầu tiên ở Việt Nam dạy và thi 6 môn của chương trình Advanced Placement (AP), thường gọi là chương trình dự bị đại học Mỹ.",
//         "image": "https://i1-vnexpress.vnecdn.net/2023/02/02/328463889-891024988600042-6177-9136-2603-1675295134.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=BCVEDMn0Smx1XLiCRi0rrA",
//         "createdAt": "2023-01-12T06:26:17.539Z",
//         "createdBy": {
//             "_id": "63ac39aeedf7c80016c57a67",
//             "name": "",
//             "avatar": ""
//         }
//     },
//     {
//         "_id": "2",
//         "title": "Lịch thi đánh giá năng lực, tư duy năm 2023",
//         "content": "Các kỳ thi đánh giá năng lực, tư duy diễn ra từ tháng 3 đến 7, thí sinh có thể tham dự nhiều đợt và đăng ký từ đầu tháng 2.",
//         "image": "https://i1-vnexpress.vnecdn.net/2023/01/31/117f5804708184dfdd90-162556098-1999-1999-1675148782.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=Ie6cEqbs1YL8PDAG85QrsA",
//         "createdAt": "2023-01-12T06:26:17.539Z",
//         "createdBy": {
//             "_id": "63ac39aeedf7c80016c57a67",
//             "name": "",
//             "avatar": ""
//         }
//     },
//     {
//         "_id": "3",
//         "title": "Đối phó với bài tập Tết",
//         "content": "Ngày nghỉ Tết cuối cùng, hàng chục trang bài tập Toán, Tiếng Việt và Tiếng Anh của Anh Thư được giải quyết, nhưng do mẹ và dì làm giúp.",
//         "image": "https://i1-vnexpress.vnecdn.net/2023/01/30/4313-1662984910-1675082690-4516-1675083076.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=BnjiAv8Bq8iaZcGQ2jJC3Q",
//         "createdAt": "2023-01-12T06:26:17.539Z",
//         "createdBy": {
//             "_id": "63ac39aeedf7c80016c57a67",
//             "name": "",
//             "avatar": ""
//         }
//     },
//     {
//         "_id": "4",
//         "title": "Đường trở thành giáo viên ở Mỹ của một phụ nữ Việt",
//         "content": "Chị Đinh Thu Hồng phải theo học chương trình đào tạo giáo viên và hoàn thành nhiều thủ tục để được cấp phép hành nghề dạy học ở Mỹ.",
//         "image": "https://i1-vnexpress.vnecdn.net/2023/01/31/giao-vien3-7193-1674696213-167-6044-9285-1675150549.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=GJm7EfgbBZ4Pvlut0Bl1rw",
//         "createdAt": "2023-01-12T06:26:17.539Z",
//         "createdBy": {
//             "_id": "63ac39aeedf7c80016c57a67",
//             "name": "",
//             "avatar": ""
//         }
//     },
//     {
//         "_id": "5",
//         "title": "Cô giáo đèo hai con giữa mưa rét, vượt 100 km đến trường",
//         "content": "Cô Nguyễn Thị Hà gây xúc động khi đèo hai con, vượt 100 km trong mưa lạnh để trở lại điểm trường ở xã Trà Dơn, huyện Nam Trà My, sau Tết.",
//         "image": "https://i1-vnexpress.vnecdn.net/2023/01/31/untitled-1675115482-6811-1675116325.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=sDv36arZmV-B6KEYjStHbA",
//         "createdAt": "2023-01-12T06:26:17.539Z",
//         "createdBy": {
//             "_id": "63ac39aeedf7c80016c57a67",
//             "name": "",
//             "avatar": ""
//         }
//     },
//     {
//         "_id": "6",
//         "title": "Nam sinh trả lại hơn 40 triệu đồng nhặt được",
//         "content": "Lê Hải Thăng, 17 tuổi, được tuyên dương vì nộp lại túi nylon đựng hơn 40 triệu đồng nhặt được hôm 29 Tết.",
//         "image": "https://i1-vnexpress.vnecdn.net/2023/01/30/tuyenduongnamsinh-1675076463-2581-1675077291.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=vlqGCurXgocetWe4SYl13g",
//         "createdAt": "2023-01-12T06:26:17.539Z",
//         "createdBy": {
//             "_id": "63ac39aeedf7c80016c57a67",
//             "name": "",
//             "avatar": ""
//         }
//     },
//     {
//         "_id": "7",
//         "title": "Cho con đi ngắm trăng, sao từ bé",
//         "content": "Từ khi 4 tuổi, con trai chị Hồng Anh đã được đưa đi ngắm nhật thực, mưa sao băng và tham gia câu lạc bộ thiên văn trẻ em.",
//         "image": "https://i1-vnexpress.vnecdn.net/2023/01/30/danny-kim-png-1929-1673698701-1199-6656-1675037287.png?w=300&h=180&q=100&dpr=1&fit=crop&s=uYWNW2YjIsttuhLT4s8fqQ",
//         "createdAt": "2023-01-12T06:26:17.539Z",
//         "createdBy": {
//             "_id": "63ac39aeedf7c80016c57a67",
//             "name": "",
//             "avatar": ""
//         }
//     }
// ]

