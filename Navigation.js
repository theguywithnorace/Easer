import React from 'react'
import { createStackNavigator, createAppContainer,createBottomTabNavigator } from 'react-navigation'
import Login from'./Login/Login'

const TestStackNavigator = createStackNavigator({

    Login: {
        screen: Login,
        navigationOptions: {
            header:null
        },
    },

});

export default createAppContainer(TestStackNavigator)
