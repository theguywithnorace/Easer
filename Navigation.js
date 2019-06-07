import React from 'react'
import { createStackNavigator, createAppContainer,createBottomTabNavigator,  } from 'react-navigation'
import Login from'./Login/Login'
import Home from './Views/Home'
import User from './Views/User'
import Settings from './Views/Settings'


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
    User: {
        screen: User,
        navigationOptions: {
            title: 'Profil'
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            title: 'Paramètres'
        }
    },


});

export default createAppContainer(TestStackNavigator)
