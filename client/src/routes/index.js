// ROTAS
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home'
import Login from '../screens/Login'
import Register from '../screens/Register'
import QRWalletScan from '../screens/QRWalletScan'

const Stack = createNativeStackNavigator();

function Route(){
    return(
        <Stack.Navigator initialRouteName="Login" >
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
            <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
            <Stack.Screen name="QRWalletScan" component={QRWalletScan} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

export default Route;