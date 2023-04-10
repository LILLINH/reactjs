import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useContext } from 'react'
import Login from '../Login'
import SignUp from '../SignUp'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListNews from '../ListNews';
import Profile from '../Profile';
import { AppContext } from './AppContext';
import NewDetail from '../NewDetail';
import PostNews from '../PostNews';

const Stack = createNativeStackNavigator();

const User = () => {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    )
}
const News=() => {
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name = "ListNews" component ={ListNews}/>
            <Stack.Screen name ="NewDetail" component={NewDetail}/>
        </Stack.Navigator>
    )
}
const Tab = createBottomTabNavigator();

const Main = () => {
    return (
        <Tab.Navigator initialRouteName='ListNews' screenOptions={({route})=>({
            headerShown:false,
            tabBarHideOnKeyboard:true,
            tabBarActiveTintColor:'green',
            tabBarInactiveTintColor:'black',
            tabBarIcon:({focused,color,size})=>{
                if(route.name=='News'){
                    return(
                        <Image source={require('../image/home.png')}
                        style={{width:18,height:18,tintColor: focused? 'green':'black'}}></Image>

                    )
                }
                if(route.name=='PostNews'){
                    return(
                        <Image source={require('../image/post.png')}
                        style={{width:18,height:18,tintColor: focused? 'green':'black'}}></Image>

                    )
                }
                if(route.name=='Profile'){
                    return(
                        <Image source={require('../image/profileicon.png')}
                        style={{width:18,height:18,tintColor: focused? 'green':'black'}}></Image>

                    )
                }
            }
            })

        }>
            <Tab.Screen name='News' component={News} options={{title:"Home"}}/>
            <Tab.Screen name='PostNews' component={PostNews} options={{title:'PostNews'}}/>
            <Tab.Screen name='Profile' component={Profile} options={{title:"Profile"}}/>
        </Tab.Navigator>
    )
}

const AppNavigator = () => {
    const {isLogin} = useContext(AppContext);

    return(
        <>
        {
            isLogin == false ? <User/> : <Main/>
        }
        </>
    )
}

export default AppNavigator

const styles = StyleSheet.create({})