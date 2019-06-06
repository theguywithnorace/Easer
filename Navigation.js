import React from 'react'
import { createStackNavigator, createAppContainer,createBottomTabNavigator } from 'react-navigation'
import Login from'./Login/Login'
import Home from './Views/Home'
import UserProfile from './Views/UserProfile'

const TestStackNavigator = createStackNavigator({

    Login: {
        screen: Login,
        navigationOptions: {
            header:null
        },
    },
    Home: {
        screen: Home,
        navigationOptions: {
            headerLeft: null,
            title: 'Easer'
        },
    },
    UserProfile: {
        screen: UserProfile,
    },


});

export default createAppContainer(TestStackNavigator)
