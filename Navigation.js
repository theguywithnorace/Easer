import React from 'react'
import { createStackNavigator, createAppContainer,createBottomTabNavigator } from 'react-navigation'
import Login from'./Login/Login'
import Home from './Views/Home'

const TestStackNavigator = createStackNavigator({

    Login: {
        screen: Login,
        navigationOptions: {
            header:null
        },
    },
    Home:{
        screen: Home,
        navigationOptions: {
        headerLeft: null,
            title:'Easer'
    },
},

});

export default createAppContainer(TestStackNavigator)
