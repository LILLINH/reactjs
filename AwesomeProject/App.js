/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,

} from 'react-native';
import Flex from './src/Flex';
import Hello from './src/Hello';
import Tinhtoan from './src/Tinhtoan';
import Login from './src/asm/Login';
import Xoso from './src/Xoso';
import ItemListNews from './src/asm/ItemListNews';
import ListNews from './src/asm/ListNews';
import Screen1 from './src/Screen1';
import Screen2 from './src/Screen2';
import NewDetail from './src/asm/NewDetail';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUp from './src/asm/SignUp';

import { AppContextProvider } from './src/asm/ultil/AppContext';
import AppNavigator from './src/asm/ultil/AppNavigator';
import Test from './src/Test';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const App = () => {

  return (

    // <NavigationContainer theme={{colors:{background:'white'}}} >
    //   <Stack.Navigator >
    //     <Stack.Screen name="Test" component={Test} />
    //     <Stack.Screen name="Flatlist" component={FlatList} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    // <ListNews/>
    <AppContextProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AppContextProvider>


  );


};



export default App;
